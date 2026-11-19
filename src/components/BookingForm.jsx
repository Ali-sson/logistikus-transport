
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Users,
  MapPin,
  ArrowRight,
  ArrowLeftRight,
  Clock3,
  BusFront,
} from "lucide-react";

// const API_URL = "http://localhost:5000/api/trips";

const API_URL = `${import.meta.env.VITE_API_URL}/api/trips`;

function BookingForm() {
  const navigate = useNavigate();

  const [origin, setOrigin] = useState("Kaduna");
  const [destination, setDestination] = useState("Abuja");
  const [travelDate, setTravelDate] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [selectedTripId, setSelectedTripId] = useState("");
  const [passengers, setPassengers] = useState("1");

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTrips() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load trips.");
        }

        setTrips(data.trips || []);
      } catch (err) {
        console.error("Fetch trips error:", err);
        setError(
          "We couldn't load scheduled trips. Please try again shortly."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchTrips();
  }, []);

  const today = new Date();

  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const availableTrips = trips.filter((trip) => {
    const tripDate = String(trip.travelDate).slice(0, 10);

    return (
      trip.status === "scheduled" &&
      trip.origin === origin &&
      trip.destination === destination &&
      tripDate === travelDate &&
      trip.vehicleType === vehicleType
    );
  });

  const selectedTrip = availableTrips.find(
    (trip) => trip._id === selectedTripId
  );

  const passengerCount = Number(passengers);
  const farePerPassenger = selectedTrip?.farePerPassenger || 0;
  const totalFare = farePerPassenger * passengerCount;

  function resetTripSelection() {
    setSelectedTripId("");
    setPassengers("1");
  }

  function handleOriginChange(event) {
    setOrigin(event.target.value);
    resetTripSelection();
  }

  function handleDestinationChange(event) {
    setDestination(event.target.value);
    resetTripSelection();
  }

  function handleDateChange(event) {
    setTravelDate(event.target.value);
    resetTripSelection();
  }

  function handleVehicleChange(event) {
    setVehicleType(event.target.value);
    resetTripSelection();
  }

  function handleTripChange(event) {
    setSelectedTripId(event.target.value);
    setPassengers("1");
  }

  function swapLocations() {
    setOrigin(destination);
    setDestination(origin);
    resetTripSelection();
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (origin === destination) {
      alert("Departure and destination must be different.");
      return;
    }

    if (!travelDate) {
      alert("Please select your travel date.");
      return;
    }

    if (!vehicleType) {
      alert("Please select Regular or Luxury.");
      return;
    }

    if (!selectedTrip) {
      alert("Please select an available scheduled trip.");
      return;
    }

    if (
      passengerCount < 1 ||
      passengerCount > selectedTrip.capacity
    ) {
      alert("Passenger count exceeds the vehicle capacity.");
      return;
    }

    const tripDetails = {
      tripId: selectedTrip._id,
      origin: selectedTrip.origin,
      destination: selectedTrip.destination,
      travelDate: String(selectedTrip.travelDate).slice(0, 10),
      departureTime: selectedTrip.departureTime,
      vehicleType: selectedTrip.vehicleType,
      vehicleName:
        selectedTrip.vehicleType === "regular" ? "Regular" : "Luxury",
      vehicleCapacity: selectedTrip.capacity,
      numberOfPassengers: passengerCount,
      farePerPassenger: selectedTrip.farePerPassenger,
      totalFare,
    };

    sessionStorage.setItem(
      "logistikusTrip",
      JSON.stringify(tripDetails)
    );

    navigate("/booking-details");
  }

  const locationOptions = ["Kaduna", "Abuja"];

  return (
    <section
      id="booking"
      className="relative z-20 mx-auto -mt-10 max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
    >
      <div className="rounded-2xl bg-white p-5 shadow-xl ring-1 ring-gray-100 md:p-7">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-teal">
            Start your journey
          </p>

          <h2 className="mt-1 text-2xl font-bold text-brand-blue">
            Book Your Trip
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Choose your route, date, vehicle and available departure.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:items-end"
        >
          {/* Origin */}
          <div>
            <label
              htmlFor="origin"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              From
            </label>

            <div className="flex min-h-[48px] items-center gap-3 rounded-lg border border-gray-200 px-3 py-3">
              <MapPin size={19} className="shrink-0 text-brand-teal" />

              <select
                id="origin"
                value={origin}
                onChange={handleOriginChange}
                className="w-full bg-transparent text-sm text-brand-blue outline-none"
              >
                {locationOptions.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap locations */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={swapLocations}
              aria-label="Swap departure and destination"
              title="Swap locations"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-brand-teal transition hover:bg-brand-teal hover:text-white"
            >
              <ArrowLeftRight size={20} />
            </button>
          </div>

          {/* Destination */}
          <div>
            <label
              htmlFor="destination"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              To
            </label>

            <div className="flex min-h-[48px] items-center gap-3 rounded-lg border border-gray-200 px-3 py-3">
              <MapPin size={19} className="shrink-0 text-brand-teal" />

              <select
                id="destination"
                value={destination}
                onChange={handleDestinationChange}
                className="w-full bg-transparent text-sm text-brand-blue outline-none"
              >
                {locationOptions.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Travel date */}
          <div>
            <label
              htmlFor="travelDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Travel date
            </label>

            <div className="flex min-h-[48px] items-center gap-3 rounded-lg border border-gray-200 px-3 py-3">
              <CalendarDays
                size={19}
                className="shrink-0 text-brand-teal"
              />

              <input
                id="travelDate"
                type="date"
                min={minDate}
                value={travelDate}
                onChange={handleDateChange}
                required
                className="w-full min-w-0 bg-transparent text-sm text-brand-blue outline-none"
              />
            </div>
          </div>

          {/* Vehicle type */}
          <div>
            <label
              htmlFor="vehicleType"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Vehicle type
            </label>

            <div className="flex min-h-[48px] items-center gap-3 rounded-lg border border-gray-200 px-3 py-3">
              <BusFront size={19} className="shrink-0 text-brand-teal" />

              <select
                id="vehicleType"
                value={vehicleType}
                onChange={handleVehicleChange}
                required
                className="w-full bg-transparent text-sm text-brand-blue outline-none"
              >
                <option value="">Select vehicle type</option>
                <option value="regular">Regular — 7 seats</option>
                <option value="luxury">Luxury — 4 seats</option>
              </select>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {vehicleType === "regular"
                ? "₦12,000 per passenger"
                : vehicleType === "luxury"
                  ? "₦25,000 per passenger"
                  : "Select a vehicle to see its fare."}
            </p>
          </div>

          {/* Scheduled departure */}
          <div>
            <label
              htmlFor="scheduledTrip"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Available departure
            </label>

            <div className="flex min-h-[48px] items-center gap-3 rounded-lg border border-gray-200 px-3 py-3">
              <Clock3 size={19} className="shrink-0 text-brand-teal" />

              <select
                id="scheduledTrip"
                value={selectedTripId}
                onChange={handleTripChange}
                disabled={loading || !travelDate || !vehicleType || availableTrips.length === 0}
                required
                className="w-full bg-transparent text-sm text-brand-blue outline-none"
              >
                <option value="">
                  {loading
                    ? "Loading trips..."
                    : !travelDate
                      ? "Select a date first"
                      : !vehicleType
                        ? "Select a vehicle first"
                        : availableTrips.length === 0
                          ? "No matching departures"
                          : "Select departure time"}
                </option>

                {availableTrips.map((trip) => (
                  <option key={trip._id} value={trip._id}>
                    {trip.departureTime === "07:00" ? "7:00 AM" : "12:00 PM"}
                    {" — ₦"}
                    {trip.farePerPassenger.toLocaleString("en-NG")}
                  </option>
                ))}
              </select>
            </div>

            {!loading &&
              travelDate &&
              vehicleType &&
              availableTrips.length === 0 &&
              !error && (
                <p className="mt-2 text-sm text-amber-700">
                  No {vehicleType} departures are scheduled for this route
                  and date.
                </p>
              )}
          </div>

          {/* Passenger count */}
          <div>
            <label
              htmlFor="passengers"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Passengers
            </label>

            <div className="flex min-h-[48px] items-center gap-3 rounded-lg border border-gray-200 px-3 py-3">
              <Users size={19} className="shrink-0 text-brand-teal" />

              <select
                id="passengers"
                value={passengers}
                onChange={(event) => setPassengers(event.target.value)}
                disabled={!selectedTrip}
                className="w-full bg-transparent text-sm text-brand-blue outline-none"
              >
                {Array.from(
                  { length: selectedTrip?.capacity || 1 },
                  (_, index) => index + 1
                ).map((count) => (
                  <option key={count} value={count}>
                    {count} {count === 1 ? "passenger" : "passengers"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fare summary */}
          <div className="rounded-lg bg-gray-50 p-4 md:col-span-2 lg:col-span-3">
            <p className="text-sm text-gray-500">Total estimated fare</p>

            <p className="mt-1 text-2xl font-bold text-brand-blue">
              ₦{totalFare.toLocaleString("en-NG")}
            </p>

            {selectedTrip && (
              <p className="mt-1 text-sm text-gray-500">
                {passengerCount} passenger
                {passengerCount === 1 ? "" : "s"} × ₦
                {farePerPassenger.toLocaleString("en-NG")}
                {" · "}
                {selectedTrip.departureTime === "07:00"
                  ? "7:00 AM"
                  : "12:00 PM"}
              </p>
            )}
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 md:col-span-2 lg:col-span-3">
              {error}
            </p>
          )}

          {/* Continue */}
          <button
            type="submit"
            disabled={loading || !selectedTrip}
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-brand-teal px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-50 md:col-span-2 lg:col-span-3"
          >
            Continue to Booking
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}

export default BookingForm;
