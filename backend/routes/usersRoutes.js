const express = require('express');

const { getUsers, getUser, updateUser, createUser, deleteUser } = require('../controllers/usersController');
const { userLogin, userLogout } = require('../middleware/user/userAuthentication');

module.exports = express.Router()
  .get('/', getUsers)
  .get('/:email', getUser)
  .patch('/update/:email', updateUser)
  .post('/signup', createUser)
  .post('/login', userLogin)
  .post('/logout', userLogout)
  .delete('/delete/:email', deleteUser);
