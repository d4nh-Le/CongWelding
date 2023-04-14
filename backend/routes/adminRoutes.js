const express = require('express');

const { getAdmin, getAdminMember, updateAdmin, createAdmin, deleteAdmin } = require('../controllers/adminControllers');
const { adminLogin, adminLogout, adminAuth } = require('../middleware/admin/adminAuthentication');

module.exports = express.Router()
  .get('/', adminAuth, getAdmin)
  .get('/:email', adminAuth, getAdminMember)
  .patch('/update/:email', adminAuth, updateAdmin)
  .post('/signup', adminAuth, createAdmin)
  .post('/login', adminLogin)
  .post('/logout', adminAuth, adminLogout)
  .delete('/delete/:email', adminAuth, deleteAdmin);