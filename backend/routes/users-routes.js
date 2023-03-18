const express = require('express');

const { getUsers, getUser, updateUser, createUser, deleteUser } = require('../controllers/users-controllers');
const { login, logout } = require('../middleware/user-authentication');

module.exports = express.Router()
  .get('/', getUsers)
  .get('/:email', getUser)
  .patch('/update/:email', updateUser)
  .post('/signup', createUser)
  .post('/login', login)
  .post('/logout', logout)
  .delete('/delete/:email', deleteUser);
