const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const tripRoutes = require("./routes/tripRoutes");
const adminRoutes = require("./routes/adminRoutes");


const connectDB = require("./config/db");




const app = express();
const PORT = process.env.PORT || 5000;


 // Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/admin", adminRoutes);


// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Logistikus backend is running!");
});

app.post("/test-booking-route", (req, res) => {
  console.log("TEST BOOKING ROUTE RECEIVED");

  res.status(200).json({
    message: "Backend is receiving POST requests correctly.",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
