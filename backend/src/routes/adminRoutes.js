const express = require('express');
const router = express.Router();
const {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  updateProfile,
  changePassword,
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { roleGuard } = require('../middleware/roleGuard');
const upload = require('../middleware/upload');

// Admin user management (superadmin only)
router.get('/users', protect, roleGuard('superadmin'), getAdmins);
router.post('/users', protect, roleGuard('superadmin'), createAdmin);
router.put('/users/:id', protect, roleGuard('superadmin'), updateAdmin);
router.delete('/users/:id', protect, roleGuard('superadmin'), deleteAdmin);

// Profile management (any authenticated admin)
router.put('/profile', protect, upload.single('avatar'), updateProfile);
router.put('/password', protect, changePassword);

module.exports = router;
