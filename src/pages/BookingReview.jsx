
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BusFront,
  CalendarDays,
  Clock,
  Users,
  UserRound,
  Phone,
  Mail,
  ShieldCheck,
  Banknote,
} from "lucide-react";

import Navbar from "../components/Navbar";

function BookingReview() {
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [passenger, setPassenger] = useState(null);

  useEffect(() => {
    try {
      const savedTrip = sessionStorage.getItem("logistikusTrip");
      const savedPassenger = sessionStorage.getItem("logistikusPassenger");

      if (!savedTrip || !savedPassenger) {
        navigate("/");
        return;
      }

      const parsedTrip = JSON.parse(savedTrip);
      const parsedPassenger = JSON.parse(savedPassenger);

      if (
        !parsedTrip.origin ||
        !parsedTrip.destination ||
        !parsedTrip.travelDate ||
        !parsedTrip.numberOfPassengers ||
        !parsedPassenger.passengerName ||
        !parsedPassenger.passengerPhone ||
        !parsedPassenger.passengerEmail
      ) {
        navigate("/");
        return;
      }

      setTrip(parsedTrip);
      setPassenger(parsedPassenger);
    } catch {
      alert("We could not load your booking details. Please try again.");
      navigate("/");
    }
  }, [navigate]);

  function formatDate(date) {
    const parsedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-NG", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function formatTime(time) {
    if (!time) return "To be confirmed";

    // Convert a 24-hour time such as 07:00 to 7:00 AM.
    if (/^\d{2}:\d{2}$/.test(time)) {
      const [hours, minutes] = time.split(":").map(Number);
      const date = new Date(2000, 0, 1, hours, minutes);

      return date.toLocaleTimeString("en-NG", {
        hour: "numeric",
        minute: "2-digit",
      });
    }

    return time;
  }

  function formatFare(amount) {
    if (amount == null || !Number.isFinite(Number(amount))) {
      return "To be confirmed";
    }

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(Number(amount));
  }

  if (!trip || !passenger) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading booking details...</p>
      </div>
    );
  }

  // Use the fare saved with the selected trip.
  const farePerPassenger =
    trip.farePerPassenger != null
      ? Number(trip.farePerPassenger)
      : null;

  const passengerCount = Number(trip.numberOfPassengers);

  const totalAmount =
    trip.totalFare != null
      ? Number(trip.totalFare)
      : farePerPassenger != null
        ? farePerPassenger * passengerCount
        : null;

  const validFare =
    totalAmount != null &&
    Number.isFinite(totalAmount) &&
    totalAmount >= 0;

  const vehicleName =
    trip.vehicleName ||
    (trip.vehicleType === "regular"
      ? "Regular"
      : trip.vehicleType === "luxury"
        ? "Luxury"
        : "To be confirmed");

  function handleProceedToPayment() {
    if (!validFare) {
      alert(
        "The fare for this trip is unavailable. Please return to trip selection."
      );
      return;
    }

    navigate("/payment");
  }

  return (
    <>
    <Navbar/>
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => navigate("/booking-details")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-teal-700"
        >
          <ArrowLeft size={18} />
          Back to passenger details
        </button>

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-700">
            <BusFront size={28} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Review Your Booking
          </h1>

          <p className="mt-2 text-gray-500">
            Confirm that your trip and passenger details are correct.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
          {/* Journey header */}
          <div className="bg-teal-700 px-6 py-6 text-white sm:px-8">
            <p className="text-sm text-teal-100">Your journey</p>

            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="break-words text-xl font-bold sm:text-2xl">
                  {trip.origin}
                </p>
                <p className="mt-1 text-sm text-teal-100">Departure</p>
              </div>

              <div className="flex flex-1 items-center justify-center gap-2">
                <div className="h-px flex-1 bg-teal-300" />
                <BusFront size={24} />
                <div className="h-px flex-1 bg-teal-300" />
              </div>

              <div className="min-w-0 text-right">
                <p className="break-words text-xl font-bold sm:text-2xl">
                  {trip.destination}
                </p>
                <p className="mt-1 text-sm text-teal-100">Destination</p>
              </div>
            </div>
          </div>

          <div className="space-y-7 p-6 sm:p-8">
            {/* Trip information */}
            <section>
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Trip details
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CalendarDays
                    size={20}
                    className="mt-0.5 shrink-0 text-teal-700"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Travel date</p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(trip.travelDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock
                    size={20}
                    className="mt-0.5 shrink-0 text-teal-700"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Departure time</p>
                    <p className="font-semibold text-gray-900">
                      {formatTime(trip.departureTime)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BusFront
                    size={20}
                    className="mt-0.5 shrink-0 text-teal-700"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Vehicle type</p>
                    <p className="font-semibold text-gray-900">
                      {vehicleName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users
                    size={20}
                    className="mt-0.5 shrink-0 text-teal-700"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Passengers</p>
                    <p className="font-semibold text-gray-900">
                      {passengerCount}
                      {passengerCount === 1 ? " passenger" : " passengers"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Passenger information */}
            <section>
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Passenger details
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <UserRound
                    size={19}
                    className="shrink-0 text-gray-400"
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Full name</p>
                    <p className="break-words font-medium text-gray-900">
                      {passenger.passengerName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={19} className="shrink-0 text-gray-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Phone number</p>
                    <p className="break-words font-medium text-gray-900">
                      {passenger.passengerPhone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={19} className="shrink-0 text-gray-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Email address</p>
                    <p className="break-words font-medium text-gray-900">
                      {passenger.passengerEmail}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Fare summary */}
            <section>
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Fare summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4 text-gray-600">
                  <span>
                    Fare per passenger × {passengerCount}
                  </span>
                  <span className="text-right font-medium">
                    {formatFare(farePerPassenger)}
                    {" × "}
                    {passengerCount}
                  </span>
                </div>

                <hr className="border-dashed border-gray-200" />

                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-gray-900">
                    Total amount
                  </span>
                  <span className="text-right text-2xl font-bold text-teal-700">
                    {formatFare(totalAmount)}
                  </span>
                </div>
              </div>
            </section>

            <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
              <ShieldCheck
                size={21}
                className="mt-0.5 shrink-0 text-teal-700"
              />
              <p className="text-sm leading-6 text-gray-600">
                Please check your details carefully before proceeding.
                Your booking is not yet confirmed, and payment must be
                completed according to the selected payment method.
              </p>
            </div>

            <button
              type="button"
              onClick={handleProceedToPayment}
              disabled={!validFare}
              className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-4 font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Proceed to Payment
              {validFare && ` — ${formatFare(totalAmount)}`}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-center text-sm text-gray-500">
          <Banknote size={16} />
          Logistikus Transport Services
        </div>
      </div>
    </section>
    </>
  );
}

export default BookingReview;
