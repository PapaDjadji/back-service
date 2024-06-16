const logger = require('../../helpers/logger');
const Package = require('../../models/package');


exports.createPackage = async (req, res, next) => {
  try {
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all packages
exports.getAllPackage = async (req, res, next) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a package by ID
exports.getPackageByID = async (req, res, next) => {
  try {
    const package = await Package.findOne({ package_id: req.params.id }).populate({
      path: 'active_delivery_id',
      model: 'Delivery',
      match: { 'active_delivery_id': { $exists: false } },
      localField: 'active_delivery_id',
      foreignField: 'delivery_id'
    });
    if (!package) return res.status(404).json({ message: 'Package not found' });
    res.json(package);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a package by ID
exports.updatePackage = async (req, res, next) => {
  try {
    const updatedPackage = await Package.findOneAndUpdate({ package_id: req.params.id }, req.body, { new: true, runValidators: true });
    if (!updatedPackage) return res.status(404).json({ message: 'Package not found' });
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a package by ID
exports.deletePackage = async (req, res, next) => {
  try {
    const deletedPackage = await Package.findOneAndDelete({ package_id: req.params.id });
    if (!deletedPackage) return res.status(404).json({ message: 'Package not found' });
    res.json({ message: 'Package deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};