const HttpError = require('../../models/httpError');
const bcrypt = require('bcrypt');
// put unverified user model here
const User = require('../../models/roles/verified/user');
const crypto = require('crypto');
const cookieMaxMins = 20;

const userSignup = async (req, res, next) => {

}

const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
  
    let existingUser;
  
    try {
      existingUser = await User.findOne({ email: email })
    } catch (err) {
      const error = new HttpError(
        'Logging in failed, please try again later.',
        500
      );
      return next(error);
    }
  
    if (!existingUser) {
      const error = new HttpError(
        'Invalid credentials, could not log you in.',
        401
      );
      return next(error);
    }
  
    let isValidPassword = false;

    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
      const error = new HttpError('Could not log you in, please check your credentials and try again.', 500);
      return next(error);
    }

    if (!isValidPassword) {
      const error = new HttpError('Invalid credentials, could not log you in.', 401);
      return next(error);
    }

    const sessionId = crypto.randomBytes(32).toString('hex');

    try {
      await User.updateOne({ _id: existingUser._id }, { $set: { sessionId: sessionId } });
    } catch (err) {
      const error = new HttpError('Logging in failed, please try again later.', 500);
      return next(error);
    }

    res.cookie('sessionId', sessionId, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: cookieMaxMins * 60 * 1000 }); // set maxAge to 30 minutes (in milliseconds)
    res.json({ userId: existingUser.id, email: existingUser.email, message: 'Successfully logged in!' });
  };

  const userLogout = async (req, res, next) => {
    const sessionId = req.cookies.sessionId;
  
    if (!sessionId) {
      const error = new HttpError('You are not currently logged in.', 401);
      return next(error);
    }
  
    try {
      const user = await User.findOneAndUpdate({ sessionId: sessionId }, { sessionId: uuidv4() }, { new: true });
      if (!user) {
        const error = new HttpError('Invalid session ID.', 401);
        return next(error);
      }
    } catch (err) {
      const error = new HttpError('Logging out failed, please try again later.', 500);
      return next(error);
    }
  
    res.clearCookie('sessionId');
    res.json({ message: 'Successfully logged out' });
  }
  

  const userAuth = async (req, res, next) => {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
      const error = new HttpError('Unauthorized', 401);
      return next(error);
    }
  
    let user;
    try {
      user = await User.findOne({ sessionId: sessionId });
    } catch (err) {
      const error = new HttpError('Something went wrong, please try again later.', 500);
      return next(error);
    }
  
    if (!user) {
      const error = new HttpError('Unauthorized', 401);
      return next(error);
    }
  
    req.userData = { userId: user.id, email: user.email };
    next();
  };
  

  module.exports = {
    userLogin,
    userLogout,
    userAuth
  };