const express = require('express');

const { getStaff, getStaffMember, updateStaff, createStaff, deleteStaff } = require('../controllers/staffControllers');
const { staffLogin, staffLogout } = require('../middleware/staff/staffAuthentication');

module.exports = express.Router()
  .get('/', getStaff)
  .get('/:email', getStaffMember)
  .patch('/update/:email', updateStaff)
  .post('/signup', createStaff)
  .post('/login', staffLogin)
  .post('/logout', staffLogout)
  .delete('/delete/:email', deleteStaff);