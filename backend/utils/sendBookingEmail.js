
// Send emails using Resend API.

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

// Send an email through Resend.
async function sendEmail({ to, subject, text }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.EMAIL_FROM ||
        "Logistikus Transport Services <info@logistikustravels.com>",
      to: [to],
      subject,
      text,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || `Resend email failed with status ${response.status}`
    );
  }

  console.log("Resend email accepted:", result.id);

  return result;
}

// Send confirmation to passenger.
async function sendPassengerEmail(booking) {
  return sendEmail({
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
  return sendEmail({
    to: "info@logistikustravels.com",
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
