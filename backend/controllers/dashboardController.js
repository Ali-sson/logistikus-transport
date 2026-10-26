
const Booking = require("../models/Booking");

async function getDashboardStats(req, res) {
  try {
    // Count all bookings saved in MongoDB.
    const totalBookings = await Booking.countDocuments();

    // Count bookings whose payment has been verified.
    const paidBookings = await Booking.countDocuments({
      paymentStatus: "paid",
    });

    // Add the total amounts from verified payments.
    const revenueResult = await Booking.aggregate([
      {
        $match: {
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    // Count upcoming bookings using today's date.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingTrips = await Booking.countDocuments({
      travelDate: { $gte: today },
      bookingStatus: "confirmed",
    });

    // Send the statistics to the frontend.
    res.status(200).json({
      totalBookings,
      paidBookings,
      totalRevenue,
      upcomingTrips,
    });
  } catch (error) {
    console.error("Dashboard statistics error:", error.message);

    res.status(500).json({
      message: "Unable to retrieve dashboard statistics.",
    });
  }
}



async function getRecentBookings(req, res) {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select(
        "passengerName bookingReference origin destination travelDate departureTime vehicleType numberOfPassengers seatNumbers paymentStatus bookingStatus totalAmount tripId createdAt"
      )
      .lean();

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Recent bookings error:", error.message);

    res.status(500).json({
      message: "Unable to retrieve recent bookings.",
    });
  }
}

module.exports = { getDashboardStats, getRecentBookings };
