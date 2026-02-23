const express = require('express');
const router = express.Router();
const {
  getPublishedBlogs,
  getBlogBySlug,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getPublishedBlogs);

// IMPORTANT: /all must come before /:slug so "all" is not treated as a slug
router.get('/all', protect, getBlogs);

router.get('/:slug', getBlogBySlug);
router.post('/', protect, upload.single('image'), createBlog);
router.put('/:id', protect, upload.single('image'), updateBlog);
router.delete('/:id', protect, deleteBlog);

module.exports = router;
