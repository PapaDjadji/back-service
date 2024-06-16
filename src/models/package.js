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

const PackageSchema = new mongoose.Schema({
  package_id: { type: String, required: true, index: true, default: uuidv4 },
  active_delivery_id: {
    type: String,
    ref: "Delivery",
    required: false
  },
  description: { type: String, required:true },
  weight: { type: Number, required: false },   // weight in grams
  width: { type: Number, required: false }, // width in cm
  height: { type: Number, required: false }, // heigth in cm
  depth: { type: Number, required: false },
  from_name: { type: String, required: false },
  from_address: { type: String, required: false },
  from_location: { type: locationSchema, required : true },
  to_name: { type: String, required: false },
  to_address: { type: String, required: false },
  to_location: { type: locationSchema , reguired :true},
});

module.exports = mongoose.model('Package', PackageSchema);