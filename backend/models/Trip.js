
const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    origin: {
      type: String,
      enum: ["Kaduna", "Abuja"],
      required: true,
    },

    destination: {
      type: String,
      enum: ["Kaduna", "Abuja"],
      required: true,
    },

    travelDate: {
      type: Date,
      required: true,
    },

    departureTime: {
      type: String,
      enum: ["07:00", "12:00"],
      required: true,
    },

    vehicleType: {
      type: String,
      enum: ["regular", "luxury"],
      required: true,
    },

    vehicleNumber: {
      type: String,
      trim: true,
      default: "",
    },

    farePerPassenger: {
      type: Number,
      required: true,
      min: 0,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["scheduled", "cancelled", "completed"],
      default: "scheduled",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", tripSchema);
