const express = require('express');

const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/usersController');
const { userLogin, userLogout, userAuth, userSignup, userVerify, userResendVerify } = require('../middleware/user/userAuthentication');

module.exports = express.Router()
  .get('/', getUsers)
  .get('/:email', getUser)
  .post('/login', userLogin)
  .post('/logout', userLogout)
  .post('/verify/:activate', userVerify)
  .post('/signup', userSignup)
  .patch('/update', userAuth, updateUser)
  .patch('/resendVerify', userResendVerify)
  .delete('/delete', userAuth, deleteUser);
