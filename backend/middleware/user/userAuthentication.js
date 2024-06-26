const HttpError = require('../../models/httpError');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcrypt');
const bcryptRounds = 10;
const User = require('../../models/roles/verified/user');
const UnverifiedUser = require('../../models/roles/unverified/unverifiedUser');
const { v4: uuidv4 } = require('uuid');
const { userSendActivation } = require('./userMailer');
const { minLength } = User.schema.paths.password.validators[0];
const cookieMaxMins = 20;
const verifyAPI = "/verify/";

// Creates sessionID as a cookie and in the database
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

    const sessionId = uuidv4();

    try {
      await User.updateOne({ _id: existingUser._id }, { $set: { sessionId: sessionId } });
    } catch (err) {
      const error = new HttpError('Logging in failed, please try again later.', 500);
      return next(error);
    }

    res.cookie('sessionId', sessionId, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: cookieMaxMins * 60 * 1000 }); // set maxAge to 30 minutes (in milliseconds)
    res.json({ userId: existingUser.id, email: existingUser.email, message: 'Successfully logged in!' });
  };

  // Logs out user by removing session cookie and change sessionId on database
  const userLogout = async (req, res, next) => {
    const sessionId = req.cookies.sessionId;
  
    if (!sessionId) {
      const error = new HttpError('You are not currently logged in.', 401);
      return next(error);
    }

    let user;

    try {
      user = await User.findOne({ sessionId: sessionId });

      if (!user) {
        const error = new HttpError('Invalid session ID.', 401);
        return next(error);
      }
    } catch (err) {
      const error = new HttpError('Logging out failed, please try again later.', 500);
      return next(error);
    }

    // Sets sessionId to new uuid so old one can't be reused
    user.sessionId = uuidv4();

    try {
      await user.save();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update user.',
        500
      );
      return next(error);
    }
  
    res.clearCookie('sessionId');
    res.json({ message: 'Successfully logged out' });
  }

  // Creates unverified user
  const userSignup = async (req, res, next) => {
    check('firstName').not().isEmpty(),
    check('lastName').not().isEmpty(),
    check('email').normalizeEmail().isEmail(), // Puts it in lowercase as casing doesn't matter for emails and checks if it has a valid email structure
    check('password').isLength({ min: minLength })

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
    const { firstName, lastName, email, password } = req.body;

    let existingUser;
    let hashedPassword;
    const verificationToken = uuidv4();
    const uniqueUrl = uuidv4();
    const activationLink = req.protocol + '://' + req.get('host') + verifyAPI + uniqueUrl;

    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      const error = new HttpError(
        'Failed to check for existing user.',
        500
      );
      return next(error);
    }

    try {
      hashedPassword = await bcrypt.hash(password, bcryptRounds);
    } catch (err) {
      const error = new HttpError(
        'Password hashing failed, please try again later.',
        500
      );
      return next(error);
    }
    
    if (existingUser) {
      const error = new HttpError(
        'User exists already, please login instead.',
        422
      );
      return next(error);
    }
    
    const createdUnverifiedUser = new UnverifiedUser({
      firstName,
      lastName,
      password: hashedPassword,
      email,
      verificationToken,
      uniqueUrl
    });

    let previewUrl;

    try {
      previewUrl = await userSendActivation(activationLink, email);
    } catch (err) {
      const error = new HttpError(
        'Sending verification email failed, please try again.',
        500
      );
      console.log(err);
      return next(error);
    }

    try {
      await createdUnverifiedUser.save();
    } catch (err) {
      const error = new HttpError(
        'Saving user failed, please try again.',
        500
      );
      console.log(err);  
      return next(error);
    }

    res.cookie('verificationToken', verificationToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: cookieMaxMins * 60 * 1000 });
    res.status(201).json({ user: createdUnverifiedUser.toObject({ getters: true }), previewUrl });
  }
  
  // Compares sessionId in database to sessionId from cookie for auth
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

  // Changes unverifiedUser into a permanent User provided they have the right verification url and token
  const userVerify = async (req, res, next) => {
    const verificationToken = req.cookies.verificationToken;
    const uniqueUrl = req.params.activate;

    if (!verificationToken) {
      const error = new HttpError('Unauthorized', 401);
      return next(error);
    }
  
    let unverifiedUser;

    //Checks for token and url match
    try {
      unverifiedUser = await UnverifiedUser.findOne({ verificationToken: verificationToken, uniqueUrl: uniqueUrl });
    } catch (err) {
      const error = new HttpError('Something went wrong, please try again later.', 500);
      return next(error);
    }
  
    if (!unverifiedUser) {
      const error = new HttpError('Unauthorized', 401);
      return next(error);
    }

    const createdUser = new User({
      firstName: unverifiedUser.firstName,
      lastName: unverifiedUser.lastName,
      email: unverifiedUser.email,
      password: unverifiedUser.password
    });
  
    try {
      await createdUser.save();
      await unverifiedUser.remove();
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again.',
        500
      );
      console.log(err);
      return next(error);
    }
  
    res.clearCookie('verificationToken');
    res.status(201).json({user: createdUser.toObject({ getters: true })});
  }

  // Useful for when people clear their cookies or they didn't receive their email
  const userResendVerify = async(req, res, next) => {
    const { email } = req.body;
    console.log(email);

    let unverifiedUser;

    const verificationToken = uuidv4();
    const uniqueUrl = uuidv4();
    const activationLink = req.protocol + '://' + req.get('host') + verifyAPI + uniqueUrl;

    try {
      unverifiedUser = await UnverifiedUser.findOne({ email: email });
      console.log(unverifiedUser)
    } catch (err) {
      const error = new HttpError('Can\'t find unactivated user with email address specified.', 404);
      return next(error);
    }

    if(!unverifiedUser) {
      const error = new HttpError('Can\'t find unactivated user with email address specified.', 404);
      return next(error);
    }

    verificationToken ? unverifiedUser.verificationToken = verificationToken : null;
    uniqueUrl ? unverifiedUser.uniqueUrl = uniqueUrl : null;

    try {
      await unverifiedUser.save();
    } catch (err) {
      const error = new HttpError('Failed to update unactivated user.', 500);
      return next(error);
    }

    try {
      await userSendActivation(activationLink, email);
    } catch (err) {
      const error = new HttpError('Failed to send activation email.', 500);
      return next(error);
    }

    res.cookie('verificationToken', verificationToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: cookieMaxMins * 60 * 1000 });
    res.status(200).json("Sent email sent to " + email);
  }
  

  module.exports = {
    userLogin,
    userLogout,
    userAuth,
    userSignup,
    userVerify,
    userResendVerify
  };