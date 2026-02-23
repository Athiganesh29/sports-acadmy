const express = require('express');
const router = express.Router();
const {
  getPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
} = require('../controllers/programController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getPrograms);
router.get('/:id', getProgram);
router.post('/', protect, upload.single('image'), createProgram);
router.put('/:id', protect, upload.single('image'), updateProgram);
router.delete('/:id', protect, deleteProgram);

module.exports = router;
