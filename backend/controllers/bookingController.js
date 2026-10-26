
const Booking = require("../models/Booking");
const Trip = require("../models/Trip");
const crypto = require("crypto");
const mongoose = require("mongoose");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const {
      tripId,
      passengerName,
      passengerPhone,
      passengerEmail,
      numberOfPassengers,
    } = req.body;

    // 1. Validate passenger information.
    if (
      !tripId ||
      !passengerName?.trim() ||
      !passengerPhone?.trim() ||
      !passengerEmail?.trim() ||
      numberOfPassengers === undefined ||
      numberOfPassengers === null ||
      numberOfPassengers === ""
    ) {
      return res.status(400).json({
        message: "Please provide your trip ID and all passenger details.",
      });
    }

    // 2. Check that tripId is a valid MongoDB ID.
    if (!mongoose.isValidObjectId(tripId)) {
      return res.status(400).json({
        message: "The selected trip ID is invalid. Please select a trip again.",
      });
    }

    // 3. Find the actual scheduled trip in MongoDB.
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({
        message: "The selected trip could not be found. Please select another trip.",
      });
    }

    if (trip.status !== "scheduled") {
      return res.status(400).json({
        message: "This trip is no longer available for booking.",
      });
    }

    // 4. Validate the number of passengers.
    const passengerCount = Number(numberOfPassengers);

    if (!Number.isInteger(passengerCount) || passengerCount < 1) {
      return res.status(400).json({
        message: "Number of passengers must be at least 1.",
      });
    }

    if (passengerCount > trip.capacity) {
      return res.status(400).json({
        message: `This vehicle can carry a maximum of ${trip.capacity} passengers.`,
      });
    }

    // 5. Validate the passenger email format.
    const email = passengerEmail.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
      });
    }

    // 6. Find bookings belonging to this exact scheduled trip.
    // Cancelled bookings do not occupy seats.
    const existingBookings = await Booking.find({
      tripId: trip._id,
      bookingStatus: { $ne: "cancelled" },
    }).select("seatNumbers");

    // 7. Collect the seat numbers already assigned.
    const occupiedSeats = new Set(
      existingBookings.flatMap((booking) => booking.seatNumbers || [])
    );

    // 8. Find enough free seats.
    const availableSeats = [];

    for (let seat = 1; seat <= trip.capacity; seat++) {
      const seatNumber = String(seat);

      if (!occupiedSeats.has(seatNumber)) {
        availableSeats.push(seatNumber);
      }
    }

    if (availableSeats.length < passengerCount) {
      return res.status(409).json({
        message: "Not enough seats are available for this departure.",
      });
    }

    // 9. Assign seats automatically.
    const seatNumbers = availableSeats.slice(0, passengerCount);

    // 10. Calculate the official fare from the saved trip.
    const farePerPassenger = trip.farePerPassenger;
    const totalAmount = farePerPassenger * passengerCount;

    // 11. Generate a unique booking reference.
    const bookingReference =
      "LOG-" + crypto.randomBytes(5).toString("hex").toUpperCase();

    // 12. Save the booking with details from the database trip.
    const booking = await Booking.create({
      tripId: trip._id,
      bookingReference,
      passengerName: passengerName.trim(),
      passengerPhone: passengerPhone.trim(),
      passengerEmail: email,

      origin: trip.origin,
      destination: trip.destination,
      travelDate: trip.travelDate,
      departureTime: trip.departureTime,
      vehicleType: trip.vehicleType,

      farePerPassenger,
      numberOfPassengers: passengerCount,
      seatNumbers,
      totalAmount,

      paymentStatus: "pending",
      bookingStatus: "pending",
    });

    // 13. Return the saved booking to the frontend.
    return res.status(201).json({
      message: "Booking created successfully. Payment is pending.",
      booking: {
        _id: booking._id,
        tripId: booking.tripId,
        bookingReference: booking.bookingReference,
        passengerName: booking.passengerName,
        passengerPhone: booking.passengerPhone,
        passengerEmail: booking.passengerEmail,
        origin: booking.origin,
        destination: booking.destination,
        travelDate: booking.travelDate,
        departureTime: booking.departureTime,
        vehicleType: booking.vehicleType,
        farePerPassenger: booking.farePerPassenger,
        numberOfPassengers: booking.numberOfPassengers,
        seatNumbers: booking.seatNumbers,
        totalAmount: booking.totalAmount,
        paymentStatus: booking.paymentStatus,
        bookingStatus: booking.bookingStatus,
      },
    });
  } catch (error) {
    console.error("Create booking error:", error);

    return res.status(500).json({
      message: "Unable to create booking. Please try again.",
    });
  }
};

module.exports = { createBooking };
