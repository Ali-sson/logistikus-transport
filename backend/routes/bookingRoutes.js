
const express = require("express");
const router = express.Router();

const { createBooking } = require("../controllers/bookingController");

router.post("/", (req, res, next) => {
  console.log("BOOKING ROUTE REACHED");
  next();
}, createBooking);

module.exports = router;
