
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  ShieldCheck,
  BusFront,
  LoaderCircle,
} from "lucide-react";

function Payment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const trip = JSON.parse(
    sessionStorage.getItem("logistikusTrip") || "null"
  );

  const passenger = JSON.parse(
    sessionStorage.getItem("logistikusPassenger") || "null"
  );

  if (!trip || !passenger) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="text-center">
          <p className="text-gray-600">
            Your booking details could not be found.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-4 rounded-lg bg-teal-700 px-5 py-3 text-white"
          >
            Start a new booking
          </button>
        </div>
      </div>
    );
  }

  // These fares must match the backend's official fares.
  const vehicleFares = {
    regular: 12000,
    luxury: 25000,
  };

  const farePerPassenger = vehicleFares[trip.vehicleType] ?? 0;

  const totalAmount =
    farePerPassenger * Number(trip.numberOfPassengers);

  const vehicleName =
    trip.vehicleType === "luxury" ? "Luxury" : "Regular";

  const formatDepartureTime = (time) => {
    if (time === "07:00") return "7:00 AM";
    if (time === "12:00") return "12:00 PM";
    return time || "Not selected";
  };

  async function handleOnlinePayment() {
    try {
      setLoading(true);

      // Check that the selected trip includes the required details.
      if (
        !trip.departureTime ||
        !trip.vehicleType ||
        !vehicleFares[trip.vehicleType]
      ) {
        throw new Error(
          "Your departure time or vehicle type is missing. Please return to the trip selection page and select them again."
        );
      }

      // Step 1: Create the booking in MongoDB.
      const bookingResponse = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
         
body: JSON.stringify({
  tripId: trip.tripId,
  passengerName: passenger.passengerName,
  passengerPhone: passenger.passengerPhone,
  passengerEmail: passenger.passengerEmail,
  numberOfPassengers: trip.numberOfPassengers,
}),

        }
      );

      const bookingData = await bookingResponse.json();

      if (!bookingResponse.ok) {
        throw new Error(
          bookingData.message || "Could not create booking."
        );
      }

      // The controller returns the booking inside bookingData.booking.
      const booking =
        bookingData.booking ||
        bookingData.data?.booking ||
        bookingData.data ||
        bookingData;

      const bookingId = booking._id;

      if (!bookingId) {
        throw new Error(
          "The booking response does not contain a booking ID."
        );
      }

      // Save the booking ID for the payment callback and ticket flow.
      sessionStorage.setItem("logistikusBookingId", bookingId);

      // Step 2: Use the booking saved by the backend.
      // The backend calculates the official amount in naira.
      const confirmedAmount = Number(booking.totalAmount);

      if (
        !Number.isFinite(confirmedAmount) ||
        confirmedAmount !== totalAmount
      ) {
        throw new Error(
          "The booking amount does not match the selected fare. Please contact support before trying again."
        );
      }

      // Step 3: Ask the backend to initialize Paystack.
      const paymentResponse = await fetch(
        "http://localhost:5000/api/payments/initialize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookingId }),
        }
      );

      const paymentData = await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(
          paymentData.message || "Could not initialize payment."
        );
      }

      if (!paymentData.authorizationUrl) {
        throw new Error("Paystack checkout URL was not returned.");
      }

      // Step 4: Redirect the passenger to Paystack.
      window.location.href = paymentData.authorizationUrl;
    } catch (error) {
      console.error("Payment error:", error);
      alert(error.message || "Payment could not be started.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <button
          onClick={() => navigate("/booking-review")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-teal-700"
        >
          <ArrowLeft size={18} />
          Back to booking review
        </button>

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-700">
            <CreditCard size={27} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Secure Payment
          </h1>

          <p className="mt-2 text-gray-500">
            Review your fare before proceeding to payment.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900">
              Booking summary
            </h2>

            <div className="mt-5 flex items-center gap-4 rounded-xl bg-gray-50 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-teal-700 shadow-sm">
                <BusFront size={25} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900">
                  {trip.origin} to {trip.destination}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Travel date: {trip.travelDate}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Departure: {formatDepartureTime(trip.departureTime)}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Vehicle: {vehicleName}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {trip.numberOfPassengers}{" "}
                  {Number(trip.numberOfPassengers) === 1
                    ? "passenger"
                    : "passengers"}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between gap-4 text-sm text-gray-600">
                <span>Fare per passenger</span>
                <span className="font-medium">
                  ₦{farePerPassenger.toLocaleString("en-NG")}
                </span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Number of passengers</span>
                <span>{trip.numberOfPassengers}</span>
              </div>

              <hr className="border-gray-200" />

              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-gray-900">
                  Total to pay
                </span>

                <span className="text-2xl font-bold text-teal-700">
                  ₦{totalAmount.toLocaleString("en-NG")}
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-teal-100 bg-teal-50 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={22}
                  className="mt-0.5 shrink-0 text-teal-700"
                />

                <div>
                  <p className="font-semibold text-gray-900">
                    Online payment
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Pay securely online through Paystack. Your ticket
                    will be issued after your payment has been verified.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleOnlinePayment}
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-4 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle size={20} className="animate-spin" />
                  Please wait...
                </>
              ) : (
                <>
                  <CreditCard size={20} />
                  Pay ₦{totalAmount.toLocaleString("en-NG")}
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-gray-500">
              You will be redirected to Paystack to complete your
              payment securely.
            </p>
          </div>
        </div>

        <p className="mt-5 text-center text-sm text-gray-500">
          Logistikus Transport Services
        </p>
      </div>
    </div>
  );
}

export default Payment;
