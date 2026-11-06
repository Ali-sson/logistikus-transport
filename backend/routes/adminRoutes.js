const express = require("express");
const router = express.Router();

const { loginAdmin } = require("../controllers/adminController");
const protectAdmin = require("../middleware/authMiddleware");
const { getAllBookings } = require("../controllers/bookingController");

// Admin login (no token required)
router.post("/login", loginAdmin);

// Get all bookings (admin authentication required)
router.get("/bookings", protectAdmin, getAllBookings);

module.exports = router;