const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const locationSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
});

const DeliverySchema = new mongoose.Schema({
  delivery_id: { type: String, required: true, index: true, default: uuidv4 },
  package_id: {
    type: String,  
    ref: "Package",
    index: true,
    required: true,
  },
  pickup_time: { type: Date, required: false },
  start_time: { type: Date, required: false },
  end_time: { type: Date, required: false },
  location: { type: locationSchema },
  status: {
    type: String,
    enum: ["open", "picked-up", "in-transit", "delivered", "failed"],
    index: true
  },
});

module.exports = mongoose.model('Delivery', DeliverySchema);
