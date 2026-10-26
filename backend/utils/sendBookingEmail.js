
const nodemailer = require("nodemailer");

async function sendBookingEmail(booking) {
  // Create a temporary test email account.
  const testAccount = await nodemailer.createTestAccount();

  // Configure the email transporter.
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  // Send the booking confirmation email.
  const info = await transporter.sendMail({
    from: '"Logistikus Transport Services" <bookings@example.com>',
    to: booking.passengerEmail,
    subject: "Your Logistikus Booking Confirmation",
    text: `
Hello ${booking.passengerName},

Your payment has been confirmed successfully.

Booking reference: ${booking.bookingReference}
Route: ${booking.origin} to ${booking.destination}
Travel date: ${new Date(booking.travelDate).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    })}
Passengers: ${booking.numberOfPassengers}
Assigned seats: ${booking.seatNumbers?.join(", ") || "Pending"}
Amount paid: ₦${Number(booking.totalAmount).toLocaleString("en-NG")}

Thank you for choosing Logistikus Transport Services.
    `,
  });

  // Print the temporary email preview link.
  console.log("Test email preview:", nodemailer.getTestMessageUrl(info));
}

module.exports = sendBookingEmail;
