
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    passengerName: {
      type: String,
      required: true,
      trim: true,
    },

    passengerPhone: {
      type: String,
      required: true,
      trim: true,
    },

    passengerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    origin: {
      type: String,
      required: true,
      enum: ["Kaduna", "Abuja"],
    },

    destination: {
      type: String,
      required: true,
      enum: ["Kaduna", "Abuja"],
    },

    travelDate: {
      type: Date,
      required: true,
    },

    departureTime: {
      type: String,
      required: true,
      enum: ["07:00", "12:00"],
    },

    vehicleType: {
      type: String,
      required: true,
      enum: ["regular", "luxury"],
    },

    farePerPassenger: {
      type: Number,
      required: true,
      min: 0,
    },

    numberOfPassengers: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    bookingReference: {
      type: String,
      unique: true,
      required: true,
    },

    tripId: {
  type: require("mongoose").Schema.Types.ObjectId,
  ref: "Trip",
  index: true,
},

    seatNumbers: {
      type: [String],
      default: [],
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    confirmationEmailSent: {
      type: Boolean,
      default: false,
    },

    paystackReference: {
      type: String,
      unique: true,
      sparse: true,
    },

    bookingStatus: {
      type: String,
      enum: ["confirmed", "pending", "cancelled"],
      default: "pending",
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
