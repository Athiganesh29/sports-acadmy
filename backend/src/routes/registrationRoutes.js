const express = require('express');
const router = express.Router();
const {
  createRegistration,
  getRegistrations,
  getRegistration,
  updateStatus,
  exportCSV,
} = require('../controllers/registrationController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', upload.single('photo'), createRegistration);
router.get('/', protect, getRegistrations);

// IMPORTANT: /export/csv must come before /:id so "export" is not treated as an ID
router.get('/export/csv', protect, exportCSV);

router.get('/:id', protect, getRegistration);
router.put('/:id/status', protect, updateStatus);

module.exports = router;
