const Gallery = require('../models/Gallery');

// @desc    Get all gallery items (with optional type and category filters)
// @route   GET /api/gallery
// @access  Public
const getGalleryItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.type) {
      filter.type = req.query.type;
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const total = await Gallery.countDocuments(filter);
    const items = await Gallery.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: items.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Create a gallery item
// @route   POST /api/gallery
// @access  Private
const createGalleryItem = async (req, res) => {
  try {
    if (req.file) {
      req.body.url = req.file.path;
    } else if (req.body.videoUrl) {
      req.body.url = req.body.videoUrl;
    }
    const item = await Gallery.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Gallery item created successfully',
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Bulk create gallery items
// @route   POST /api/gallery/bulk
// @access  Private
const bulkCreateGalleryItems = async (req, res) => {
  try {
    // When files are uploaded via multipart form, build items from req.files
    let items;
    if (req.files && req.files.length > 0) {
      items = req.files.map((file) => ({
        url: file.path,
        title: req.body.title || file.originalname,
        type: req.body.type || 'image',
        category: req.body.category || 'general',
      }));
    } else {
      items = req.body.items;
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide gallery items or upload files',
      });
    }

    const createdItems = await Gallery.insertMany(items);

    res.status(201).json({
      success: true,
      message: `${createdItems.length} gallery items created successfully`,
      count: createdItems.length,
      data: createdItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Update a gallery item
// @route   PUT /api/gallery/:id
// @access  Private
const updateGalleryItem = async (req, res) => {
  try {
    if (req.file) {
      req.body.url = req.file.path;
    }
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Gallery item updated successfully',
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Delete a gallery item
// @route   DELETE /api/gallery/:id
// @access  Private
const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully',
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
  getGalleryItems,
  createGalleryItem,
  bulkCreateGalleryItems,
  updateGalleryItem,
  deleteGalleryItem,
};
