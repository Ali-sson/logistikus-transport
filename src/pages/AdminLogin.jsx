
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      sessionStorage.setItem("adminToken", data.token);
      console.log("Admin token saved:", Boolean(data.token));
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-gray-800">
          Logistikus Admin Login
        </h1>

        <p className="mt-2 mb-6 text-sm text-gray-500">
          Sign in to manage bookings and trips.
        </p>

        <label className="mb-2 block text-sm font-medium">
          Admin email
        </label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="username"
          className="mb-4 w-full rounded-lg border border-gray-300 p-3"
          placeholder="Enter your admin email"
        />

        <label className="mb-2 block text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          autoComplete="current-password"
          className="mb-4 w-full rounded-lg border border-gray-300 p-3"
          placeholder="Enter your password"
        />

        {error && (
          <p role="alert" className="mb-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-700 p-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
