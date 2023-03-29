const { validationResult, check } = require('express-validator');

const HttpError = require('../models/httpError');
const User = require('../models/roles/verified/user');
const { minLength } = User.schema.paths.password.validators[0];
const bcrypt = require('bcrypt');
const bcryptRounds = 10;

// Creates new user
const createUser = async (req, res, next) => {
  check('name').not().isEmpty(),
  check('email').normalizeEmail().isEmail(), // Puts it in lowercase as casing doesn't matter for emails and checks if it has a valid email structure
  check('password').isLength({ min: minLength })

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { name, password, email, gender } = req.body;

  let existingUser;
  let hashedPassword;

  try {
    existingUser = await User.findOne({ email: email });
    hashedPassword = await bcrypt.hash(password, bcryptRounds);
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
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
  
  const createdUser = new User({
    name,
    password: hashedPassword,
    email,
    gender
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({user: createdUser.toObject({ getters: true })});
};

// Gets all existing users
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({users: users.map(user => user.toObject({ getters: true })), ipAddress: req.ip});
};

// Gets a specific user
const getUser = async (req, res, next) => {
  const userEmail = req.params.email;

  let user;
  try {
    user = await User.findOne({ email: userEmail });
  } catch (err) {
    const error = new HttpError(
      'Fetching user failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user with the given email.', 404);
    return next(error);
  }

  res.json({ user: user.toObject({ getters: true }) });
};

// Updates an existing user
const updateUser = async (req, res, next) => {
  check('name').optional().not().isEmpty(),
  check('email').optional().normalizeEmail().isEmail() // Puts it in lowercase as casing doesn't matter for emails and checks if it has a valid email structure

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const userEmail = req.params.email;
  const { name, password, email, gender } = req.body;
  
  let user;
  try {
    user = await User.findOne({ email: userEmail });

  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update user.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for the provided email.', 404);
    return next(error);
  }

  // Sets user attributes under the condition they neither null or undefined
  name ? user.name = name : null;
  gender ? user.gender = gender : null;
  email ? user.email = email : null;
  password ? user.password = password : null;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update user.',
      500
    );
    return next(error);
  }

  res.status(200).json({user: user.toObject({ getters: true })});
};

const deleteUser = async (req, res, next) => {
  const userEmail = req.params.email;

  let user;
  try {
    user = await User.findOne({ email: userEmail });
  } catch (err) {
    const error = new HttpError(
      'Deleting user failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user with the given email.', 404);
    return next(error);
  }

  try {
    await user.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete user.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted user.' });
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
