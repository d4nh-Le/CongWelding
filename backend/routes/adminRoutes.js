const express = require('express');

const { getAdmin, getAdminMember, updateAdmin, createAdmin, deleteAdmin } = require('../controllers/adminControllers');
const { adminLogin, adminLogout } = require('../middleware/admin/adminAuthentication');

module.exports = express.Router()
  .get('/', getAdmin)
  .get('/:email', getAdminMember)
  .patch('/update/:email', updateAdmin)
  .post('/signup', createAdmin)
  .post('/login', adminLogin)
  .post('/logout', adminLogout)
  .delete('/delete/:email', deleteAdmin);