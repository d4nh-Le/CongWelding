const HttpError = require('../../models/httpError');
const bcrypt = require('bcrypt');
const Staff = require('../../models/staff');
const crypto = require('crypto');
const cookieMaxMins = 20;

const staffLogin = async (req, res, next) => {
    const { email, password } = req.body;
  
    let existingStaff;
  
    try {
      existingStaff = await Staff.findOne({ email: email })
    } catch (err) {
      const error = new HttpError(
        'Logging in failed, please try again later.',
        500
      );
      return next(error);
    }
  
    if (!existingStaff) {
      const error = new HttpError(
        'Invalid credentials, could not log you in.',
        401
      );
      return next(error);
    }
  
    let isValidPassword = false;

    try {
      isValidPassword = await bcrypt.compare(password, existingStaff.password);
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
      await Staff.updateOne({ _id: existingStaff._id }, { $set: { sessionId: sessionId } });
    } catch (err) {
      const error = new HttpError('Logging in failed, please try again later.', 500);
      return next(error);
    }

    res.cookie('sessionId', sessionId, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: cookieMaxMins * 60 * 1000 }); // set maxAge to 30 minutes (in milliseconds)
    res.json({ staffId: existingStaff.id, email: existingStaff.email, message: 'Successfully logged in!' });
  };

  const staffLogout = async (req, res, next) => {
    const sessionId = req.cookies.sessionId;
  
    if (!sessionId) {
      const error = new HttpError('You are not currently logged in.', 401);
      return next(error);
    }
  
    try {
      const staff = await Staff.findOneAndUpdate({ sessionId: sessionId }, { sessionId: uuidv4() }, { new: true });
      if (!staff) {
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
  

  const staffAuth = async (req, res, next) => {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
      const error = new HttpError('Unauthorized', 401);
      return next(error);
    }
  
    let staff;
    try {
      staff = await Staff.findOne({ sessionId: sessionId });
    } catch (err) {
      const error = new HttpError('Something went wrong, please try again later.', 500);
      return next(error);
    }
  
    if (!staff) {
      const error = new HttpError('Unauthorized', 401);
      return next(error);
    }
  
    req.staffData = { staffId: staff.id, email: staff.email };
    next();
  };
  

  module.exports = {
    staffLogin,
    staffLogout,
    staffAuth
  };