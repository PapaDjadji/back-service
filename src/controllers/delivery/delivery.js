const Delivery = require('../../models/delivery');
const logger = require('../../helpers/logger');
const Package = require('../../models/package');

// Create a new delivery
exports.createDelivery = async (req , res, next) => {
  try {
    const packageExists = await Package.findOne({ package_id: req.body.package_id });
    if (!packageExists) {
      return res.status(400).json({ message: 'Package not found' });
    }
    const newDelivery = new Delivery(req.body);
    const savedDelivery = await newDelivery.save();
    res.status(201).json(savedDelivery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all deliveries
exports.getAllDelivery = async (req , res, next) => {
  try {
    const deliveries = await Delivery.find().populate({
      path: 'package_id',  
      model: 'Package',
      select: 'package_id from_name', 
      match: { package_id: { $exists: true } },  
      localField: 'package_id',  
      foreignField: 'package_id'  
    });
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a delivery by ID
exports.getDeliveryByID = async (req , res, next) => {
  try {
    const delivery = await Delivery.findOne({ delivery_id: req.params.id }).populate({
      path: 'package_id',
      model: 'Package',
      match: { package_id: { $exists: true } },
      localField: 'package_id',
      foreignField: 'package_id'
    });
    if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a delivery by ID
exports.updateDelivery = async (req , res, next) => {
  try {
    const updatedDelivery = await Delivery.findOneAndUpdate({ delivery_id: req.params.id }, req.body, { new: true, runValidators: true });
    if (!updatedDelivery) return res.status(404).json({ message: 'Delivery not found' });
    res.json(updatedDelivery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a delivery by ID
exports.deleteDelivery = async (req , res, next) => {
  try {
    const deletedDelivery = await Delivery.findOneAndDelete({ delivery_id: req.params.id });
    if (!deletedDelivery) return res.status(404).json({ message: 'Delivery not found' });
    res.json({ message: 'Delivery deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};