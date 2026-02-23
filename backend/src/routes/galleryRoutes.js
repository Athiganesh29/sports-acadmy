const express = require('express');
const router = express.Router();
const {
  getGalleryItems,
  createGalleryItem,
  bulkCreateGalleryItems,
  updateGalleryItem,
  deleteGalleryItem,
} = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getGalleryItems);
router.post('/', protect, upload.single('file'), createGalleryItem);
router.post('/bulk', protect, upload.array('files', 20), bulkCreateGalleryItems);
router.put('/:id', protect, upload.single('file'), updateGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

module.exports = router;
