const Program = require('../models/Program');

// @desc    Get all programs (with optional ageGroup filter)
// @route   GET /api/programs
// @access  Public
const getPrograms = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const filter = { isActive: true };

    if (req.query.ageGroup) {
      filter.ageGroup = req.query.ageGroup;
    }

    const total = await Program.countDocuments(filter);
    const programs = await Program.find(filter)
      .populate('coach', 'name sport photo')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: programs.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: programs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get single program by ID
// @route   GET /api/programs/:id
// @access  Public
const getProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id).populate(
      'coach',
      'name sport photo bio experience'
    );

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found',
      });
    }

    res.status(200).json({
      success: true,
      data: program,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Create a new program
// @route   POST /api/programs
// @access  Private
const createProgram = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    // Remove empty string ObjectId fields to prevent CastError
    if (!req.body.coach) delete req.body.coach;
    if (req.body.fee === '') delete req.body.fee;
    const program = await Program.create(req.body);

    const populatedProgram = await Program.findById(program._id).populate(
      'coach',
      'name sport photo'
    );

    res.status(201).json({
      success: true,
      message: 'Program created successfully',
      data: populatedProgram,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Update a program
// @route   PUT /api/programs/:id
// @access  Private
const updateProgram = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    if (!req.body.coach) delete req.body.coach;
    if (req.body.fee === '') delete req.body.fee;
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('coach', 'name sport photo');

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Program updated successfully',
      data: program,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Delete a program
// @route   DELETE /api/programs/:id
// @access  Private
const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Program deleted successfully',
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
  getPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
};
