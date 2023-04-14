const express = require('express');

const { getStaff, getStaffMember, updateStaff, createStaff, deleteStaff } = require('../controllers/staffControllers');
const { staffLogin, staffLogout, staffAuth } = require('../middleware/staff/staffAuthentication');
const { adminAuth } = require('../middleware/admin/adminAuthentication');

module.exports = express.Router()
  .get('/', staffAuth || adminAuth, getStaff)
  .get('/:email', staffAuth || adminAuth, getStaffMember)
  .patch('/update/:email', staffAuth || adminAuth, updateStaff)
  .post('/signup', staffAuth || adminAuth, createStaff)
  .post('/login', staffLogin)
  .post('/logout', staffAuth, staffLogout)
  .delete('/delete/:email', staffAuth || adminAuth, deleteStaff);