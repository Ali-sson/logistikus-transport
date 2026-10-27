
import { useState } from "react";

function TestTrips() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function createTrip() {
    setLoading(true);
    setMessage("");

    try {
      const response = await 
    fetch(`${import.meta.env.VITE_API_URL}/api/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin: "Kaduna",
          destination: "Abuja",
          travelDate: "2026-10-25",
          departureTime: "07:00",
          vehicleType: "regular",
          vehicleNumber: "LOG-001",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to create trip.");
      }

      setMessage(
        `Success! Trip created. Fare: ₦${data.trip.farePerPassenger}. Capacity: ${data.trip.capacity} passengers.`
      );
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl p-8">
      <h1 className="mb-4 text-2xl font-bold">
        Logistikus Trip Tester
      </h1>

      <p className="mb-4">
        Kaduna to Abuja · October 25, 2026 · 7:00 AM · Regular
      </p>

      <button
        onClick={createTrip}
        disabled={loading}
        className="rounded bg-green-700 px-5 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Creating trip..." : "Create Test Trip"}
      </button>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

export default TestTrips;
