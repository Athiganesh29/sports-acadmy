const express = require('express');
const router = express.Router();
const {
  getStats,
  getRecent,
  getChart,
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

router.get('/stats', protect, getStats);
router.get('/recent', protect, getRecent);
router.get('/chart', protect, getChart);

module.exports = router;
