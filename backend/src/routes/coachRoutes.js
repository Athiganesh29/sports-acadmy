const express = require('express');
const router = express.Router();
const {
  getCoaches,
  getCoach,
  createCoach,
  updateCoach,
  deleteCoach,
} = require('../controllers/coachController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getCoaches);
router.get('/:id', getCoach);
router.post('/', protect, upload.single('photo'), createCoach);
router.put('/:id', protect, upload.single('photo'), updateCoach);
router.delete('/:id', protect, deleteCoach);

module.exports = router;
