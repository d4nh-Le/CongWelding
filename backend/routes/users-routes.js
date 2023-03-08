const express = require('express');

const { getUsers, updateUser, createUser } = require('../controllers/users-controllers');

module.exports = express.Router()
  .get('/', getUsers)
  .patch('/update/:email', updateUser)
  .post('/signup', createUser);
