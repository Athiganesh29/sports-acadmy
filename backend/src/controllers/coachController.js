const Coach = require('../models/Coach');

// @desc    Get all active coaches (public)
// @route   GET /api/coaches
// @access  Public
const getCoaches = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const filter = { isActive: true };

    const total = await Coach.countDocuments(filter);
    const coaches = await Coach.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: coaches.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: coaches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get single coach by ID
// @route   GET /api/coaches/:id
// @access  Public
const getCoach = async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);

    if (!coach) {
      return res.status(404).json({
        success: false,
        message: 'Coach not found',
      });
    }

    res.status(200).json({
      success: true,
      data: coach,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Create a new coach
// @route   POST /api/coaches
// @access  Private
const createCoach = async (req, res) => {
  try {
    if (req.file) {
      req.body.photo = req.file.path;
    }
    const coach = await Coach.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Coach created successfully',
      data: coach,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Update a coach
// @route   PUT /api/coaches/:id
// @access  Private
const updateCoach = async (req, res) => {
  try {
    if (req.file) {
      req.body.photo = req.file.path;
    }
    const coach = await Coach.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!coach) {
      return res.status(404).json({
        success: false,
        message: 'Coach not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Coach updated successfully',
      data: coach,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Delete a coach
// @route   DELETE /api/coaches/:id
// @access  Private
const deleteCoach = async (req, res) => {
  try {
    const coach = await Coach.findByIdAndDelete(req.params.id);

    if (!coach) {
      return res.status(404).json({
        success: false,
        message: 'Coach not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Coach deleted successfully',
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
  getCoaches,
  getCoach,
  createCoach,
  updateCoach,
  deleteCoach,
};
