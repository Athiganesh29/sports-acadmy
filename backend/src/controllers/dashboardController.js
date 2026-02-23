const Registration = require('../models/Registration');
const Coach = require('../models/Coach');
const Program = require('../models/Program');
const Contact = require('../models/Contact');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
const getStats = async (req, res) => {
  try {
    const [totalRegistrations, totalCoaches, totalPrograms, unreadContacts] =
      await Promise.all([
        Registration.countDocuments(),
        Coach.countDocuments({ isActive: true }),
        Program.countDocuments({ isActive: true }),
        Contact.countDocuments({ isRead: false }),
      ]);

    res.status(200).json({
      success: true,
      data: {
        totalRegistrations,
        totalCoaches,
        totalPrograms,
        unreadContacts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get recent registrations
// @route   GET /api/dashboard/recent
// @access  Private
const getRecent = async (req, res) => {
  try {
    const recentRegistrations = await Registration.find()
      .populate('program', 'name sport')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: recentRegistrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get registration chart data (last 6 months)
// @route   GET /api/dashboard/chart
// @access  Private
const getChart = async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const chartData = await Registration.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
    ]);

    // Format the data with month names
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const formattedData = chartData.map((item) => ({
      month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
      count: item.count,
    }));

    res.status(200).json({
      success: true,
      data: formattedData,
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
  getStats,
  getRecent,
  getChart,
};
