
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Ticket,
  CalendarDays,
  Bus,
  Wallet,
  Menu,
  X,
  RefreshCw,
} from "lucide-react";

async function adminFetch(url, options = {}) {
  const token = sessionStorage.getItem("adminToken");

  console.log("Admin token present:", Boolean(token));

  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${token || ""}`);

  return fetch(url, {
    ...options,
    headers,
  });
}


function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");

  const [stats, setStats] = useState({
    totalBookings: 0,
    paidBookings: 0,
    totalRevenue: 0,
    upcomingTrips: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentLoading, setRecentLoading] = useState(true);
  const [error, setError] = useState("");
  const [recentError, setRecentError] = useState("");

  const [trips, setTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(false);
  const [tripsError, setTripsError] = useState("");
  const [tripMessage, setTripMessage] = useState("");
  const [tripSubmitting, setTripSubmitting] = useState(false);

  const [tripForm, setTripForm] = useState({
    origin: "Kaduna",
    destination: "Abuja",
    travelDate: "",
    departureTime: "07:00",
    vehicleType: "regular",
    vehicleNumber: "",
  });

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Bookings", icon: Ticket },
    { name: "Trips", icon: CalendarDays },
    { name: "Fleet", icon: Bus },
    { name: "Payments", icon: Wallet },
  ];

  // Load dashboard statistics
  async function fetchDashboardStats() {
    try {
      setError("");

      const response = await adminFetch(
        // "http://localhost:5000/api/dashboard/stats"
        `${import.meta.env.VITE_API_URL}/api/dashboard/stats`
      );

      if (!response.ok) {
        throw new Error("Failed to load dashboard statistics.");
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error("Dashboard statistics error:", err);
      setError("Unable to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  }

  // Load recent bookings
  async function fetchRecentBookings() {
    try {
      setRecentError("");

      const response = await adminFetch(
        // "http://localhost:5000/api/dashboard/recent-bookings"
        `${import.meta.env.VITE_API_URL}/api/dashboard/recent-bookings`
      );

     if (!response.ok) {
  const errorText = await response.text();

  console.error("Recent bookings API response:", {
    status: response.status,
    message: errorText,
  });

  throw new Error(
    `Failed to load recent bookings: ${response.status}`
  );
}

      const data = await response.json();
      setRecentBookings(data.bookings || []);
    } catch (err) {
      console.error("Recent bookings error:", err);
      setRecentError("Unable to load recent bookings.");
    } finally {
      setRecentLoading(false);
    }
  }

  // Load scheduled trips from MongoDB

  async function fetchTrips() {
    try {
      setTripsLoading(true);
      setTripsError("");

      const response = await fetch(
        // "http://localhost:5000/api/trips"
        `${import.meta.env.VITE_API_URL}/api/trips`
      );

      const data = await response.json();

      console.log("Trips API response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load trips."
        );
      }

      // Support either an array or an object containing a trips array.
      const tripsList = Array.isArray(data)
        ? data
        : Array.isArray(data.trips)
          ? data.trips
          : [];

      console.log("Trips being displayed:", tripsList);

setTrips(
  [...tripsList].sort(
    (a, b) =>
      new Date(b.createdAt || b.travelDate) -
      new Date(a.createdAt || a.travelDate)
  )
);


    } catch (err) {
      console.error("Fetch trips error:", err);
      setTripsError(
        err.message || "Unable to load trips. Please try again."
      );
    } finally {
      setTripsLoading(false);
    }
  }


  // Schedule a new trip
  async function handleCreateTrip(event) {
    event.preventDefault();

      console.log("SCHEDULE TRIP BUTTON CLICKED");

    setTripsError("");
    setTripMessage("");

    if (tripForm.origin === tripForm.destination) {
      setTripsError(
        "Origin and destination must be different."
      );
      return;
    }

    try {
      setTripSubmitting(true);

      const response = await adminFetch(
        // "http://localhost:5000/api/trips",
        `${import.meta.env.VITE_API_URL}/api/trips`,
        
        
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tripForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to schedule trip."
        );
      }

      setTripMessage("Trip scheduled successfully.");

      setTripForm({
        origin: "Kaduna",
        destination: "Abuja",
        travelDate: "",
        departureTime: "07:00",
        vehicleType: "regular",
        vehicleNumber: "",
      });

      await fetchTrips();
    } catch (err) {
      console.error("Create trip error:", err);
      setTripsError(
        err.message || "Unable to schedule trip."
      );
    } finally {
      setTripSubmitting(false);
    }
  }

  // Cancel a trip or mark it as completed
  async function handleTripStatusChange(tripId, status) {
    const action = status === "cancelled" ? "cancel" : "complete";

    if (
      !window.confirm(
        `Are you sure you want to ${action} this trip?`
      )
    ) {
      return;
    }

    setTripsError("");
    setTripMessage("");

    try {
      const response = await adminFetch(
        `${import.meta.env.VITE_API_URL}/api/trips/${tripId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to update trip status."
        );
      }

      setTripMessage(`Trip marked as ${status}.`);

      await fetchTrips();
    } catch (err) {
      console.error("Update trip status error:", err);
      setTripsError(
        err.message || "Unable to update trip status."
      );
    }
  }

  useEffect(() => {
    fetchDashboardStats();
    fetchRecentBookings();
  }, []);

  function handleNavigation(name) {
    setActiveSection(name);
    setSidebarOpen(false);

    if (name === "Trips") {
      fetchTrips();
    }
  }

  function formatDate(dateValue) {
    if (!dateValue) return "—";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return "—";

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  }

  function formatTime(time) {
    if (time === "07:00") return "7:00 AM";
    if (time === "12:00") return "12:00 PM";
    return time || "—";
  }

  function formatStatus(status) {
    return status
      ? status.charAt(0).toUpperCase() + status.slice(1)
      : "Unknown";
  }

  function statusClass(status) {
    if (
      status === "paid" ||
      status === "confirmed" ||
      status === "scheduled"
    ) {
      return "bg-green-100 text-green-700";
    }

    if (status === "pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (
      status === "failed" ||
      status === "cancelled"
    ) {
      return "bg-red-100 text-red-700";
    }

    if (status === "completed") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-gray-100 text-gray-700";
  }

  const today = new Date();
  const minimumDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed right-4 top-4 z-50 rounded-lg bg-[#123B63] p-2 text-white md:hidden"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#123B63] text-white transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-white/10 px-6 py-6">
          <h1 className="text-xl font-bold">Logistikus</h1>
          <p className="mt-1 text-sm text-blue-200">
            Transport Management
          </p>
        </div>

        <nav className="space-y-2 px-4 py-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.name;

            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.name)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition ${
                  isActive
                    ? "bg-white text-[#123B63]"
                    : "text-blue-100 hover:bg-white/10"
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1 p-5 pt-20 md:p-8">
        {/* Page header */}
        <header className="mb-8">
          <p className="text-sm font-medium text-gray-500">
            LOGISTIKUS ADMIN
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
            {activeSection === "Dashboard"
              ? "Dashboard Overview"
              : `${activeSection} Management`}
          </h2>

          <p className="mt-2 text-gray-600">
            {activeSection === "Dashboard"
              ? "Welcome back. Here's an overview of your transport operations."
              : activeSection === "Trips"
                ? "Schedule and manage Kaduna–Abuja departures."
                : `${activeSection} tools will be added in a later step.`}
          </p>
        </header>

        {/* DASHBOARD OVERVIEW */}
        {activeSection === "Dashboard" && (
          <>
            {/* Statistics cards */}
            <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Total Bookings
                  </p>
                  <Ticket className="text-blue-700" size={24} />
                </div>

                <h3 className="mt-4 text-3xl font-bold text-gray-900">
                  {loading ? "..." : stats.totalBookings}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  All recorded bookings
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Total Revenue
                  </p>
                  <Wallet className="text-green-700" size={24} />
                </div>

                <h3 className="mt-4 text-3xl font-bold text-gray-900">
                  {loading
                    ? "..."
                    : `₦${Number(stats.totalRevenue).toLocaleString("en-NG")}`}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  From verified payments
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Upcoming Trips
                  </p>
                  <CalendarDays className="text-orange-600" size={24} />
                </div>

                <h3 className="mt-4 text-3xl font-bold text-gray-900">
                  {loading ? "..." : stats.upcomingTrips}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Confirmed future bookings
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Fleet</p>
                  <Bus className="text-purple-700" size={24} />
                </div>

                <h3 className="mt-4 text-3xl font-bold text-gray-900">
                  —
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Registered buses
                </p>
              </div>
            </section>

            {error && (
              <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Recent bookings */}
            <section className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Recent Bookings
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    The 10 most recently created bookings.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setRecentLoading(true);
                    setLoading(true);
                    fetchRecentBookings();
                    fetchDashboardStats();
                  }}
                  disabled={recentLoading || loading}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                >
                  <RefreshCw
                    size={16}
                    className={
                      recentLoading || loading ? "animate-spin" : ""
                    }
                  />
                  Refresh
                </button>
              </div>

              {recentError && (
                <div className="m-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                  {recentError}
                </div>
              )}

              {recentLoading ? (
                <p className="p-6 text-sm text-gray-500">
                  Loading recent bookings...
                </p>
              ) : !recentError && recentBookings.length === 0 ? (
                <p className="p-6 text-sm text-gray-500">
                  No bookings have been recorded yet.
                </p>
              ) : !recentError ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1050px] text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                      <tr>
                        <th className="px-6 py-4">Passenger</th>
                        <th className="px-6 py-4">Booking Reference</th>
                        <th className="px-6 py-4">Route</th>
                        <th className="px-6 py-4">Travel Date</th>
                        <th className="px-6 py-4">Departure</th>
                        <th className="px-6 py-4">Vehicle</th>
                        <th className="px-6 py-4">Seats</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Payment</th>
                        <th className="px-6 py-4">Booking</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {recentBookings.map((booking) => (
                        <tr
                          key={booking._id || booking.bookingReference}
                          className="hover:bg-gray-50"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                            {booking.passengerName || "—"}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                            {booking.bookingReference || "—"}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                            {booking.origin} → {booking.destination}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                            {formatDate(booking.travelDate)}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                            {formatTime(booking.departureTime)}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 capitalize text-gray-600">
                            {booking.vehicleType || "—"}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                            {booking.seatNumbers?.length
                              ? booking.seatNumbers.join(", ")
                              : "—"}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                            ₦{Number(booking.totalAmount || 0).toLocaleString("en-NG")}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(
                                booking.paymentStatus
                              )}`}
                            >
                              {formatStatus(booking.paymentStatus)}
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(
                                booking.bookingStatus
                              )}`}
                            >
                              {formatStatus(booking.bookingStatus)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </section>
          </>
        )}

        {/* TRIPS MANAGEMENT */}
        {activeSection === "Trips" && (
          <section className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Scheduled Departures
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Create and manage your scheduled trips.
                </p>
              </div>

              <button
                onClick={fetchTrips}
                disabled={tripsLoading}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
              >
                <RefreshCw
                  size={16}
                  className={tripsLoading ? "animate-spin" : ""}
                />
                Refresh Trips
              </button>
            </div>

            {tripMessage && (
              <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
                {tripMessage}
              </div>
            )}

            {tripsError && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
                {tripsError}
              </div>
            )}

            {/* New trip form */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">
                Schedule a New Trip
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Fare and capacity are calculated by the backend.
              </p>

              <form
                onSubmit={handleCreateTrip}
                className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Origin
                  </label>
                  <select
                    value={tripForm.origin}
                    onChange={(event) =>
                      setTripForm({
                        ...tripForm,
                        origin: event.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 p-3"
                    required
                  >
                    <option value="Kaduna">Kaduna</option>
                    <option value="Abuja">Abuja</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Destination
                  </label>
                  <select
                    value={tripForm.destination}
                    onChange={(event) =>
                      setTripForm({
                        ...tripForm,
                        destination: event.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 p-3"
                    required
                  >
                    <option value="Abuja">Abuja</option>
                    <option value="Kaduna">Kaduna</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={tripForm.travelDate}
                    min={minimumDate}
                    onChange={(event) =>
                      setTripForm({
                        ...tripForm,
                        travelDate: event.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 p-3"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Departure Time
                  </label>
                  <select
                    value={tripForm.departureTime}
                    onChange={(event) =>
                      setTripForm({
                        ...tripForm,
                        departureTime: event.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 p-3"
                    required
                  >
                    <option value="07:00">7:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Vehicle Type
                  </label>
                  <select
                    value={tripForm.vehicleType}
                    onChange={(event) =>
                      setTripForm({
                        ...tripForm,
                        vehicleType: event.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 p-3"
                    required
                  >
                    <option value="regular">Regular — ₦12,000</option>
                    <option value="luxury">Luxury — ₦25,000</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Vehicle Number
                  </label>
                  <input
                    type="text"
                    value={tripForm.vehicleNumber}
                    onChange={(event) =>
                      setTripForm({
                        ...tripForm,
                        vehicleNumber: event.target.value,
                      })
                    }
                    placeholder="e.g. LOG-002"
                    className="w-full rounded-lg border border-gray-300 p-3"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <p className="mb-4 text-sm text-gray-500">
                    {tripForm.vehicleType === "regular"
                      ? "Regular: 7 passengers · ₦12,000 per passenger"
                      : "Luxury: 4 passengers · ₦25,000 per passenger"}
                  </p>

                  <button
                    type="submit"
                    disabled={tripSubmitting}
                    className="rounded-lg bg-[#123B63] px-6 py-3 font-semibold text-white hover:bg-[#0d2d4b] disabled:opacity-60"
                  >
                    {tripSubmitting
                      ? "Scheduling..."
                      : "Schedule Trip"}
                  </button>
                </div>
              </form>
            </div>

            {/* Trips table */}
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="border-b border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900">
                  All Trips
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Trips saved in your database.
                </p>
              </div>

              {tripsLoading ? (
                <p className="p-6 text-sm text-gray-500">
                  Loading trips...
                </p>
              ) : trips.length === 0 ? (
                <p className="p-6 text-sm text-gray-500">
                  No trips found. Schedule a trip above.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[950px] text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                      <tr>
                        <th className="px-6 py-4">Route</th>
                        <th className="px-6 py-4">Travel Date</th>
                        <th className="px-6 py-4">Departure</th>
                        <th className="px-6 py-4">Vehicle</th>
                        <th className="px-6 py-4">Vehicle Number</th>
                        <th className="px-6 py-4">Fare</th>
                        <th className="px-6 py-4">Capacity</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                       {trips.length > 0 && (
  <tr>
    <td colSpan={9} className="bg-yellow-100 px-6 py-2 text-black">

    </td>
  </tr>
)}


                      {trips.map((trip) => (
                        
                       <tr
                        key={trip._id}
                        className=" hover:bg-gray-100"
>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                            {trip.origin} → {trip.destination}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                            {formatDate(trip.travelDate)}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                            {formatTime(trip.departureTime)}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 capitalize text-gray-600">
                            {trip.vehicleType}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                            {trip.vehicleNumber || "—"}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                            ₦{Number(trip.farePerPassenger).toLocaleString("en-NG")}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                            {trip.capacity}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(
                                trip.status
                              )}`}
                            >
                              {formatStatus(trip.status)}
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            {trip.status === "scheduled" ? (
                              <div className="flex gap-3">
                                <button
                                  onClick={() =>
                                    handleTripStatusChange(
                                      trip._id,
                                      "cancelled"
                                    )
                                  }
                                  className="font-medium text-red-600 hover:underline"
                                >
                                  Cancel
                                </button>

                                <button
                                  onClick={() =>
                                    handleTripStatusChange(
                                      trip._id,
                                      "completed"
                                    )
                                  }
                                  className="font-medium text-green-700 hover:underline"
                                >
                                  Complete
                                </button>
                              </div>
                            ) : (
                              <span className="text-gray-400">
                                No actions
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Other sections are not built yet */}
        {activeSection !== "Dashboard" &&
          activeSection !== "Trips" && (
            <section className="rounded-xl bg-white p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">
                {activeSection} Management
              </h3>
              <p className="mt-2 text-gray-600">
                This section will be built next.
              </p>
              <button
                onClick={() => handleNavigation("Dashboard")}
                className="mt-5 rounded-lg bg-[#123B63] px-4 py-2 font-medium text-white"
              >
                Return to Dashboard
              </button>
            </section>
          )}
      </main>
    </div>
  );
}

export default AdminDashboard;
