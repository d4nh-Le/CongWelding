const express = require('express');

const { getUsers, getUser, updateUser, createUser, deleteUser } = require('../controllers/usersController');
const { userLogin, userLogout, userAuth, userSignup, userVerify, userResendVerify } = require('../middleware/user/userAuthentication');

module.exports = express.Router()
  .get('/', getUsers)
  .get('/:email', getUser)
  .post('/create/:token', createUser)
  .post('/login', userLogin)
  //.route() need to figure out what I'm doing with this verify route
  .post('/logout', userLogout)
  .post('/verify', userVerify)
  .post('/signup', userSignup)
  .patch('/update/:email', updateUser)
  .patch('/resendVerify/:email', userResendVerify)
  .delete('/delete/:email', deleteUser);
