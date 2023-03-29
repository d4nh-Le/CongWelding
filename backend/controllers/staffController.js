const { validationResult, check } = require('express-validator');

const HttpError = require('../models/httpError');
const Staff = require('../models/staff');
const { minLength } = Staff.schema.paths.password.validators[0];
const bcrypt = require('bcrypt');
const bcryptRounds = 10;

// Creates new staff
const createStaff = async (req, res, next) => {
  check('name').not().isEmpty(),
  check('email').normalizeEmail().isEmail(), // Puts it in lowercase as casing doesn't matter for emails and checks if it has a valid email structure
  check('password').isLength({ min: minLength })

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { name, password, email, gender, role } = req.body;

  let existingStaff;
  let hashedPassword;

  try {
    existingStaff = await Staff.findOne({ email: email });
    hashedPassword = await bcrypt.hash(password, bcryptRounds);
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
  
  if (existingStaff) {
    const error = new HttpError(
      'Staff member exists already, please login instead.',
      422
    );
    return next(error);
  }
  
  const createdStaff = new Staff({
    name,
    password: hashedPassword,
    email,
    gender,
    role
  });

  try {
    await createdStaff.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({staff: createdStaff.toObject({ getters: true })});
};

// Gets all existing staff
const getStaff = async (req, res, next) => {
  let staff;
  try {
    staff = await Staff.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching staff failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({staff: staff.map(staff => staff.toObject({ getters: true })), ipAddress: req.ip});
};

// Gets a specific staff
const getStaffMember = async (req, res, next) => {
  const staffEmail = req.params.email;

  let staff;
  try {
    staff = await Staff.findOne({ email: staffEmail });
  } catch (err) {
    const error = new HttpError(
      'Fetching staff member failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!staff) {
    const error = new HttpError('Could not find staff member with the given email.', 404);
    return next(error);
  }

  res.json({ staff: staff.toObject({ getters: true }) });
};

// Updates an existing staff member
const updateStaff = async (req, res, next) => {
  check('name').optional().not().isEmpty(),
  check('email').optional().normalizeEmail().isEmail() // Puts it in lowercase as casing doesn't matter for emails and checks if it has a valid email structure

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const staffEmail = req.params.email;
  const { name, password, email, gender, role } = req.body;
  
  let staff;
  try {
    staff = await Staff.findOne({ email: staffEmail });

  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update staff member.',
      500
    );
    return next(error);
  }

  if (!staff) {
    const error = new HttpError('Could not find staff member for the provided email.', 404);
    return next(error);
  }

  // Sets staff attributes under the condition they neither null or undefined
  name ? staff.name = name : null;
  gender ? staff.gender = gender : null;
  email ? staff.email = email : null;
  password ? staff.password = password : null;
  role ? staff.role = password : null;

  try {
    await staff.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update staff member.',
      500
    );
    return next(error);
  }

  res.status(200).json({staff: staff.toObject({ getters: true })});
};

const deleteStaff = async (req, res, next) => {
  const staffEmail = req.params.email;

  let staff;
  try {
    staff = await Staff.findOne({ email: staffEmail });
  } catch (err) {
    const error = new HttpError(
      'Deleting staff member failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!staff) {
    const error = new HttpError('Could not find staff member with the given email.', 404);
    return next(error);
  }

  try {
    await staff.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete staff member.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted staff member.' });
}

module.exports = {
  createStaff,
  getStaff,
  getStaffMember,
  updateStaff,
  deleteStaff
};
