
const express = require("express");
const mongoose = require("mongoose");
const Trip = require("../models/Trip");

const router = express.Router();

// Official vehicle fares and capacities
const VEHICLE_OPTIONS = {
  regular: { fare: 12000, capacity: 7 },
  luxury: { fare: 25000, capacity: 4 },
};

// Validate trip information before saving
function validateTrip(data) {
  const { origin, destination, travelDate, departureTime, vehicleType } = data;

  if (!["Kaduna", "Abuja"].includes(origin)) {
    return "Please select a valid origin.";
  }

  if (!["Kaduna", "Abuja"].includes(destination)) {
    return "Please select a valid destination.";
  }

  if (origin === destination) {
    return "Origin and destination must be different.";
  }

  if (!travelDate || Number.isNaN(new Date(travelDate).getTime())) {
    return "Please provide a valid travel date.";
  }

  if (new Date(travelDate) < new Date(new Date().setHours(0, 0, 0, 0))) {
    return "Travel date cannot be in the past.";
  }

  if (!["07:00", "12:00"].includes(departureTime)) {
    return "Departure time must be 07:00 or 12:00.";
  }

  if (!VEHICLE_OPTIONS[vehicleType]) {
    return "Please select Regular or Luxury.";
  }

  return null;
}

// GET /api/trips
// Retrieve all trips
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find().sort({
      travelDate: 1,
      departureTime: 1,
    });

    res.status(200).json({ trips });
  } catch (error) {
    console.error("Get trips error:", error.message);
    res.status(500).json({ message: "Unable to retrieve trips." });
  }
});

// GET /api/trips/:id
// Retrieve one trip
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid trip ID." });
    }

    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found." });
    }

    res.status(200).json({ trip });
  } catch (error) {
    console.error("Get trip error:", error.message);
    res.status(500).json({ message: "Unable to retrieve trip." });
  }
});

// POST /api/trips
// Create a scheduled trip
router.post("/", async (req, res) => {
  try {
    const validationError = validateTrip(req.body);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const { origin, destination, travelDate, departureTime, vehicleType } =
      req.body;

    const vehicle = VEHICLE_OPTIONS[vehicleType];

    const trip = await Trip.create({
      origin,
      destination,
      travelDate,
      departureTime,
      vehicleType,
      vehicleNumber: req.body.vehicleNumber || "",
      farePerPassenger: vehicle.fare,
      capacity: vehicle.capacity,
    });

    res.status(201).json({
      message: "Trip created successfully.",
      trip,
    });
  } catch (error) {
    console.error("Create trip error:", error.message);
    res.status(500).json({ message: "Unable to create trip." });
  }
});

// PUT /api/trips/:id
// Update a scheduled trip
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid trip ID." });
    }

    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found." });
    }

    if (trip.status !== "scheduled") {
      return res.status(400).json({
        message: "Only scheduled trips can be edited.",
      });
    }

    const updatedData = {
      origin: req.body.origin ?? trip.origin,
      destination: req.body.destination ?? trip.destination,
      travelDate: req.body.travelDate ?? trip.travelDate,
      departureTime: req.body.departureTime ?? trip.departureTime,
      vehicleType: req.body.vehicleType ?? trip.vehicleType,
    };

    const validationError = validateTrip(updatedData);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const vehicle = VEHICLE_OPTIONS[updatedData.vehicleType];

    trip.origin = updatedData.origin;
    trip.destination = updatedData.destination;
    trip.travelDate = updatedData.travelDate;
    trip.departureTime = updatedData.departureTime;
    trip.vehicleType = updatedData.vehicleType;
    trip.farePerPassenger = vehicle.fare;
    trip.capacity = vehicle.capacity;

    if (req.body.vehicleNumber !== undefined) {
      trip.vehicleNumber = req.body.vehicleNumber;
    }

    await trip.save();

    res.status(200).json({
      message: "Trip updated successfully.",
      trip,
    });
  } catch (error) {
    console.error("Update trip error:", error.message);
    res.status(500).json({ message: "Unable to update trip." });
  }
});

// PATCH /api/trips/:id/status
// Cancel or complete a trip
router.patch("/:id/status", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid trip ID." });
    }

    const { status } = req.body;

    if (!["scheduled", "cancelled", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid trip status." });
    }

    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found." });
    }

    trip.status = status;
    await trip.save();

    res.status(200).json({
      message: "Trip status updated successfully.",
      trip,
    });
  } catch (error) {
    console.error("Update trip status error:", error.message);
    res.status(500).json({ message: "Unable to update trip status." });
  }
});

module.exports = router;
