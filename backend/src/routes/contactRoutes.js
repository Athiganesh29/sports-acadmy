const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  getContact,
  replyContact,
  deleteContact,
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

router.post('/', createContact);
router.get('/', protect, getContacts);
router.get('/:id', protect, getContact);
router.post('/:id/reply', protect, replyContact);
router.delete('/:id', protect, deleteContact);

module.exports = router;
