
const axios = require("axios");
const Booking = require("../models/Booking");
const sendBookingEmail = require("../utils/sendBookingEmail");




async function initializePayment(req, res) {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        message: "Booking ID is required.",
      });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    if (booking.paymentStatus === "paid") {
      return res.status(400).json({
        message: "This booking has already been paid for.",
      });
    }

    if (
      !booking.passengerEmail ||
      !process.env.PAYSTACK_SECRET_KEY
    ) {
      return res.status(400).json({
        message: "Passenger email or payment configuration is missing.",
      });
    }

    // Use the total amount already calculated and saved
// by the booking controller. Paystack expects kobo.
const amount = Math.round(booking.totalAmount * 100);

      console.log(
  "Paystack callback URL:",
  "http://localhost:5174/payment-callback"
);

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: booking.passengerEmail,
        amount,
        currency: "NGN",
        callback_url: "http://localhost:5174/payment-callback",
        metadata: {
          bookingId: booking._id.toString(),
          bookingReference: booking.bookingReference,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({
      message: "Payment initialized successfully.",
      authorizationUrl: response.data.data.authorization_url,
      reference: response.data.data.reference,
    });
  } catch (error) {
    console.error(
      "Paystack initialization error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      message: "Unable to initialize payment. Please try again.",
    });
  }
}


async function verifyPayment(req, res) {
  try {
    const { reference } = req.params;

    if (!reference) {
      return res.status(400).json({
        message: "Payment reference is required.",
      });
    }

    // Ask Paystack to verify the transaction.
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const transaction = response.data.data;

    // Confirm that Paystack reports a successful payment.
    if (transaction.status !== "success") {
      return res.status(400).json({
        message: "Payment has not been completed successfully.",
      });
    }

    // Find the booking associated with this transaction.
    const bookingId = transaction.metadata?.bookingId;

    if (!bookingId) {
      return res.status(400).json({
        message: "Booking information is missing from the transaction.",
      });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    // Confirm the amount and currency match the saved booking.
    const expectedAmount = booking.totalAmount * 100;

    if (
      Number(transaction.amount) !== expectedAmount ||
      transaction.currency !== "NGN"
    ) {
      return res.status(400).json({
        message: "Payment amount or currency does not match the booking.",
      });
    }

    // Confirm this transaction belongs to the expected booking.
    if (
      transaction.metadata?.bookingReference !==
      booking.bookingReference
    ) {
      return res.status(400).json({
        message: "Payment reference does not match the booking.",
      });
    }

    // Mark the booking as paid only after successful verification.
    booking.paymentStatus = "paid";
    booking.bookingStatus = "confirmed";
await booking.save();

if (!booking.confirmationEmailSent) {
  console.log("Sending booking confirmation email...");

  try {
    await sendBookingEmail(booking);

    booking.confirmationEmailSent = true;
    await booking.save();

    console.log("Booking confirmation email sent successfully.");
  } catch (emailError) {
    console.error(
      "Booking confirmation email failed:",
      emailError.message
    );
  }
} else {
  console.log("Confirmation email already sent. Skipping duplicate.");
}
    return res.status(200).json({
      message: "Payment verified successfully.",
      booking: {
        bookingReference: booking.bookingReference,
        origin: booking.origin,
        destination: booking.destination,
        travelDate: booking.travelDate,
        numberOfPassengers: booking.numberOfPassengers,
        seatNumbers: booking.seatNumbers,
        totalAmount: booking.totalAmount,
        paymentStatus: booking.paymentStatus,
        bookingStatus: booking.bookingStatus,
        passengerName: booking.passengerName,
        passengerPhone: booking.passengerPhone,
        passengerEmail: booking.passengerEmail,
      },
    });
  } catch (error) {
    console.error(
      "Payment verification error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      message: "Unable to verify payment. Please try again.",
    });
  }
}



module.exports = { initializePayment, verifyPayment };
