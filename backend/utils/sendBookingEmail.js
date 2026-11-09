
const nodemailer = require("nodemailer");

// Connect to Hostinger SMTP.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Format booking details.
function getBookingDetails(booking) {
  const travelDate = new Date(booking.travelDate).toLocaleDateString(
    "en-NG",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }
  );

  return `
Booking Reference: ${booking.bookingReference}
Passenger: ${booking.passengerName}
Passenger Email: ${booking.passengerEmail}
Passenger Phone: ${booking.passengerPhone}
Route: ${booking.origin} to ${booking.destination}
Travel Date: ${travelDate}
Departure Time: ${booking.departureTime}
Vehicle Type: ${booking.vehicleType}
Passengers: ${booking.numberOfPassengers}
Assigned Seats: ${booking.seatNumbers?.join(", ") || "Pending"}
Amount Paid: ₦${Number(booking.totalAmount).toLocaleString("en-NG")}
Payment Status: ${booking.paymentStatus}
`;
}

// Send confirmation to passenger.
async function sendPassengerEmail(booking) {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: booking.passengerEmail,
    subject: "Your Logistikus Booking Confirmation",
    text: `
Hello ${booking.passengerName},

Your payment has been confirmed successfully.

${getBookingDetails(booking)}

Thank you for choosing Logistikus Transport Services.

We look forward to having you on board.
`,
  });
}

// Send notification to company.
async function sendAdminEmail(booking) {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.SMTP_USER,
    subject: `New Paid Booking - ${booking.bookingReference}`,
    text: `
A new passenger booking has been successfully paid for.

${getBookingDetails(booking)}

Please check your administration dashboard for more details.
`,
  });
}

module.exports = {
  sendPassengerEmail,
  sendAdminEmail,
};
