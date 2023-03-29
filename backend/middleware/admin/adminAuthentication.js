const HttpError = require('../../models/httpError');
const bcrypt = require('bcrypt');
const Admin = require('../../models/roles/verified/admin');
const crypto = require('crypto');
const cookieMaxMins = 20;

const adminLogin = async (req, res, next) => {
    const { email, password } = req.body;
  
    let existingAdmin;
  
    try {
      existingAdmin = await Admin.findOne({ email: email })
    } catch (err) {
      const error = new HttpError(
        'Logging in failed, please try again later.',
        500
      );
      return next(error);
    }
  
    if (!existingAdmin) {
      const error = new HttpError(
        'Invalid credentials, could not log you in.',
        401
      );
      return next(error);
    }
  
    let isValidPassword = false;

    try {
      isValidPassword = await bcrypt.compare(password, existingAdmin.password);
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
      await Admin.updateOne({ _id: existingAdmin._id }, { $set: { sessionId: sessionId } });
    } catch (err) {
      const error = new HttpError('Logging in failed, please try again later.', 500);
      return next(error);
    }

    res.cookie('sessionId', sessionId, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: cookieMaxMins * 60 * 1000 }); // set maxAge to 30 minutes (in milliseconds)
    res.json({ adminId: existingAdmin.id, email: existingAdmin.email, message: 'Successfully logged in!' });
  };

  const adminLogout = async (req, res, next) => {
    const sessionId = req.cookies.sessionId;
  
    if (!sessionId) {
      const error = new HttpError('You are not currently logged in.', 401);
      return next(error);
    }
  
    try {
      const admin = await Admin.findOneAndUpdate({ sessionId: sessionId }, { sessionId: uuidv4() }, { new: true });
      if (!admin) {
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
  

  const adminAuth = async (req, res, next) => {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
      const error = new HttpError('Unauthorized', 401);
      return next(error);
    }
  
    let admin;
    try {
      admin = await Admin.findOne({ sessionId: sessionId });
    } catch (err) {
      const error = new HttpError('Something went wrong, please try again later.', 500);
      return next(error);
    }
  
    if (!admin) {
      const error = new HttpError('Unauthorized', 401);
      return next(error);
    }
  
    req.adminData = { adminId: admin.id, email: admin.email };
    next();
  };
  

  module.exports = {
    adminLogin,
    adminLogout,
    adminAuth
  };