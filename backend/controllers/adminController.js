const { validationResult, check } = require('express-validator');

const HttpError = require('../models/httpError');
const Admin = require('../models/roles/verified/admin');
const { minLength } = Admin.schema.paths.password.validators[0];
const bcrypt = require('bcrypt');
const bcryptRounds = 10;

// Creates new admin
const createAdmin = async (req, res, next) => {
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

  let existingAdmin;
  let hashedPassword;

  try {
    existingAdmin = await Admin.findOne({ email: email });
    hashedPassword = await bcrypt.hash(password, bcryptRounds);
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
  
  if (existingAdmin) {
    const error = new HttpError(
      'Admin member exists already, please login instead.',
      422
    );
    return next(error);
  }
  
  const createdAdmin = new Admin({
    name,
    password: hashedPassword,
    email,
    gender,
    role
  });

  try {
    await createdAdmin.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({admin: createdAdmin.toObject({ getters: true })});
};

// Gets all existing admin
const getAdmin = async (req, res, next) => {
  let admin;
  try {
    admin = await Admin.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching admin failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({admin: admin.map(admin => admin.toObject({ getters: true })), ipAddress: req.ip});
};

// Gets a specific admin
const getAdminMember = async (req, res, next) => {
  const adminEmail = req.params.email;

  let admin;
  try {
    admin = await Admin.findOne({ email: adminEmail });
  } catch (err) {
    const error = new HttpError(
      'Fetching admin member failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!admin) {
    const error = new HttpError('Could not find admin member with the given email.', 404);
    return next(error);
  }

  res.json({ admin: admin.toObject({ getters: true }) });
};

// Updates an existing admin member
const updateAdmin = async (req, res, next) => {
  check('name').optional().not().isEmpty(),
  check('email').optional().normalizeEmail().isEmail() // Puts it in lowercase as casing doesn't matter for emails and checks if it has a valid email structure

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const adminEmail = req.params.email;
  const { name, password, email, gender, role } = req.body;
  
  let admin;
  try {
    admin = await Admin.findOne({ email: adminEmail });

  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update admin member.',
      500
    );
    return next(error);
  }

  if (!admin) {
    const error = new HttpError('Could not find admin member for the provided email.', 404);
    return next(error);
  }

  // Sets admin attributes under the condition they neither null or undefined
  name ? admin.name = name : null;
  gender ? admin.gender = gender : null;
  email ? admin.email = email : null;
  password ? admin.password = password : null;
  role ? admin.role = password : null;

  try {
    await admin.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update admin member.',
      500
    );
    return next(error);
  }

  res.status(200).json({admin: admin.toObject({ getters: true })});
};

const deleteAdmin = async (req, res, next) => {
  const adminEmail = req.params.email;

  let admin;
  try {
    admin = await Admin.findOne({ email: adminEmail });
  } catch (err) {
    const error = new HttpError(
      'Deleting admin member failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!admin) {
    const error = new HttpError('Could not find admin member with the given email.', 404);
    return next(error);
  }

  try {
    await admin.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete admin member.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted admin member.' });
}

module.exports = {
  createAdmin,
  getAdmin,
  getAdminMember,
  updateAdmin,
  deleteAdmin
};
