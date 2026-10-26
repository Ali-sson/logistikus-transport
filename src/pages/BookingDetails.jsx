
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Phone,
  Mail,
  ArrowLeft,
  ArrowRight,
  MapPin,
  CalendarDays,
  Clock,
  BusFront,
  Users,
  Banknote,
} from "lucide-react";

function BookingDetails() {
  const navigate = useNavigate();

  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");

  // Retrieve the trip selected on the previous page.
  function getSavedTrip() {
    try {
      const savedTrip = sessionStorage.getItem("logistikusTrip");
      return savedTrip ? JSON.parse(savedTrip) : null;
    } catch {
      return null;
    }
  }

  const tripDetails = getSavedTrip();

  function formatDate(date) {
    if (!date) return "Not selected";

    const parsedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not selected";
    }

    return parsedDate.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !tripDetails ||
      !tripDetails.origin ||
      !tripDetails.destination ||
      !tripDetails.travelDate ||
      !tripDetails.numberOfPassengers
    ) {
      alert("Please select your trip before entering passenger details.");
      navigate("/");
      return;
    }

    if (tripDetails.origin === tripDetails.destination) {
      alert("Your departure and destination cannot be the same.");
      navigate("/");
      return;
    }

    const normalizedPhone = passengerPhone
      .trim()
      .replace(/[\s()-]/g, "");

    // Allow international numbers, including Nigerian numbers.
    if (!/^\+?\d{7,15}$/.test(normalizedPhone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    const passengerDetails = {
      ...tripDetails,
      passengerName: passengerName.trim(),
      passengerPhone: normalizedPhone,
      passengerEmail: passengerEmail.trim().toLowerCase(),
    };

    sessionStorage.setItem(
      "logistikusPassenger",
      JSON.stringify(passengerDetails)
    );

    navigate("/booking-review");
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-brand-blue transition hover:text-brand-teal"
        >
          <ArrowLeft size={18} />
          Back to trip selection
        </button>

        <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-100">
          <div className="p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-teal">
              Passenger information
            </p>

           

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Enter the lead passenger's details. We will use this information
              to manage your booking and send booking notifications.
            </p>

            {/* Trip summary */}
            {tripDetails && (
              <div className="mt-7 rounded-xl border border-gray-200 bg-gray-50 p-5">
                <h2 className="text-base font-bold text-brand-blue">
                  Your trip summary
                </h2>

                <div className="mt-4 flex items-center gap-3">
                  <MapPin
                    size={20}
                    className="shrink-0 text-brand-teal"
                  />

                  <div>
                    <p className="text-xs text-gray-500">Route</p>
                    <p className="font-semibold text-gray-800">
                      {tripDetails.origin} → {tripDetails.destination}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <CalendarDays
                      size={19}
                      className="mt-0.5 shrink-0 text-brand-teal"
                    />
                    <div>
                      <p className="text-xs text-gray-500">Travel date</p>
                      <p className="text-sm font-medium text-gray-800">
                        {formatDate(tripDetails.travelDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock
                      size={19}
                      className="mt-0.5 shrink-0 text-brand-teal"
                    />
                    <div>
                      <p className="text-xs text-gray-500">Departure time</p>
                      <p className="text-sm font-medium text-gray-800">
                        {tripDetails.departureTime || "To be confirmed"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <BusFront
                      size={19}
                      className="mt-0.5 shrink-0 text-brand-teal"
                    />
                    <div>
                      <p className="text-xs text-gray-500">Vehicle</p>
                      <p className="text-sm font-medium text-gray-800">
                        {tripDetails.vehicleName || "To be confirmed"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users
                      size={19}
                      className="mt-0.5 shrink-0 text-brand-teal"
                    />
                    <div>
                      <p className="text-xs text-gray-500">Passengers</p>
                      <p className="text-sm font-medium text-gray-800">
                        {tripDetails.numberOfPassengers}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-2">
                    <Banknote size={20} className="text-brand-teal" />
                    <span className="text-sm font-medium text-gray-600">
                      Total fare
                    </span>
                  </div>

                  <p className="text-lg font-bold text-brand-blue">
                    {formatFare(tripDetails.totalFare)}
                  </p>
                </div>
              </div>
            )}

            {/* Passenger form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="passengerName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full name *
                </label>

                <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 transition focus-within:border-brand-teal focus-within:ring-2 focus-within:ring-brand-teal/10">
                  <UserRound
                    size={19}
                    className="shrink-0 text-brand-teal"
                  />

                  <input
                    id="passengerName"
                    name="passengerName"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={passengerName}
                    onChange={(event) =>
                      setPassengerName(event.target.value)
                    }
                    required
                    minLength={2}
                    maxLength={100}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="passengerPhone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Phone number *
                </label>

                <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 transition focus-within:border-brand-teal focus-within:ring-2 focus-within:ring-brand-teal/10">
                  <Phone size={19} className="shrink-0 text-brand-teal" />

                  <input
                    id="passengerPhone"
                    name="passengerPhone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="e.g. 08012345678"
                    value={passengerPhone}
                    onChange={(event) =>
                      setPassengerPhone(event.target.value)
                    }
                    required
                    maxLength={20}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="passengerEmail"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email address *
                </label>

                <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 transition focus-within:border-brand-teal focus-within:ring-2 focus-within:ring-brand-teal/10">
                  <Mail size={19} className="shrink-0 text-brand-teal" />

                  <input
                    id="passengerEmail"
                    name="passengerEmail"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={passengerEmail}
                    onChange={(event) =>
                      setPassengerEmail(event.target.value)
                    }
                    required
                    maxLength={254}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Please provide an email address you can access.
                </p>
              </div>

              <button
                type="submit"
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-brand-teal px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2"
              >
                Continue to Review
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingDetails;
