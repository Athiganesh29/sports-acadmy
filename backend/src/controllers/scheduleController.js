const Schedule = require('../models/Schedule');

// @desc    Get all schedules (with optional day and program filters)
// @route   GET /api/schedules
// @access  Public
const getSchedules = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const filter = { isActive: true };

    if (req.query.day) {
      filter.day = req.query.day;
    }

    if (req.query.program) {
      filter.program = req.query.program;
    }

    const total = await Schedule.countDocuments(filter);
    const schedules = await Schedule.find(filter)
      .populate('program', 'name sport ageGroup')
      .populate('coach', 'name sport photo')
      .sort({ day: 1, startTime: 1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: schedules.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: schedules,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get single schedule by ID
// @route   GET /api/schedules/:id
// @access  Public
const getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
      .populate('program', 'name sport ageGroup')
      .populate('coach', 'name sport photo');

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found',
      });
    }

    res.status(200).json({
      success: true,
      data: schedule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Create a new schedule
// @route   POST /api/schedules
// @access  Private
const createSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);

    const populatedSchedule = await Schedule.findById(schedule._id)
      .populate('program', 'name sport ageGroup')
      .populate('coach', 'name sport photo');

    res.status(201).json({
      success: true,
      message: 'Schedule created successfully',
      data: populatedSchedule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Update a schedule
// @route   PUT /api/schedules/:id
// @access  Private
const updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('program', 'name sport ageGroup')
      .populate('coach', 'name sport photo');

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Schedule updated successfully',
      data: schedule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Delete a schedule
// @route   DELETE /api/schedules/:id
// @access  Private
const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Schedule deleted successfully',
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
  getSchedules,
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
