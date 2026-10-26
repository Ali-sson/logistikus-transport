
const express = require("express");
const router = express.Router();

const protectAdmin = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getRecentBookings,
} = require("../controllers/dashboardController");

// Require admin authentication for every route in this file
router.use(protectAdmin);

// Dashboard statistics
router.get("/stats", getDashboardStats);

// Recent bookings
router.get("/recent-bookings", getRecentBookings);

module.exports = router;
