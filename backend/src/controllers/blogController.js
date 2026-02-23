const Blog = require('../models/Blog');

// @desc    Generate URL-friendly slug from title
// @param   {string} title - The title to slugify
// @returns {string} The generated slug
const slugify = (title) => {
  return title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')    // Remove non-word chars (except hyphens)
    .replace(/\-\-+/g, '-')     // Replace multiple hyphens with single
    .replace(/^-+/, '')          // Trim hyphens from start
    .replace(/-+$/, '');         // Trim hyphens from end
};

// @desc    Get published blog posts (public)
// @route   GET /api/blogs/published
// @access  Public
const getPublishedBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const filter = { isPublished: true };

    if (req.query.tag) {
      filter.tags = req.query.tag;
    }

    const total = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get blog post by slug (public)
// @route   GET /api/blogs/slug/:slug
// @access  Public
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      isPublished: true,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get all blog posts (admin, includes drafts)
// @route   GET /api/blogs
// @access  Private
const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.isPublished !== undefined) {
      filter.isPublished = req.query.isPublished === 'true';
    }

    const total = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Create a blog post (auto-generates slug from title)
// @route   POST /api/blogs
// @access  Private
const createBlog = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    // Auto-generate slug from title
    let slug = slugify(title);

    // Ensure slug uniqueness by appending a counter if needed
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      slug = `${slug}-${Date.now()}`;
    }

    if (req.file) {
      req.body.image = req.file.path;
    }
    // Parse tags from JSON string (sent via FormData)
    if (typeof req.body.tags === 'string') {
      try { req.body.tags = JSON.parse(req.body.tags); } catch { req.body.tags = []; }
    }
    // Parse isPublished boolean from string
    if (typeof req.body.isPublished === 'string') {
      req.body.isPublished = req.body.isPublished === 'true';
    }

    const blog = await Blog.create({
      ...req.body,
      slug,
    });

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    if (req.file) {
      req.body.image = req.file.path;
    }
    // Parse tags from JSON string (sent via FormData)
    if (typeof req.body.tags === 'string') {
      try { req.body.tags = JSON.parse(req.body.tags); } catch { req.body.tags = []; }
    }
    // Parse isPublished boolean from string
    if (typeof req.body.isPublished === 'string') {
      req.body.isPublished = req.body.isPublished === 'true';
    }

    // Re-generate slug if title is changed
    if (req.body.title && req.body.title !== blog.title) {
      let newSlug = slugify(req.body.title);

      const existingBlog = await Blog.findOne({ slug: newSlug, _id: { $ne: blog._id } });
      if (existingBlog) {
        newSlug = `${newSlug}-${Date.now()}`;
      }

      req.body.slug = newSlug;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = {
  getPublishedBlogs,
  getBlogBySlug,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
