const HttpError = require('../models/http-error');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');
const tokenExpiryTime = 30; // in minutes

const login = async (req, res, next) => {
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

    let token;

    try {
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        secretKey,
        { expiresIn: tokenExpiryTime * 60 } // sets expiration to 60 minutes (in seconds)
      );
    } catch (err) {
      const error = new HttpError('Logging in failed, please try again later.', 500);
      return next(error);
    }

    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: tokenExpiryTime * 60 * 1000 }); // set maxAge to 60 minutes (in milliseconds)
    res.json({ userId: existingUser.id, email: existingUser.email, token: token, message: 'Successfully logged in!' });
  };

  const logout = async (req, res, next) => {

    if(!req.cookies.token) {
      const error = new HttpError('You are not currently logged in.', 401);
      return next(error);
    }

    res.clearCookie('token');
    res.json({ message: 'Successfully logged out' });
  }

  module.exports = {
    login,
    logout
  };