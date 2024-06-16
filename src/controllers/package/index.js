const express = require('express');
const router = express.Router();
const packageController = require('./package');

router.post('/', packageController.createPackage);
router.get('/', packageController.getAllPackage);
router.get('/:id', packageController.getPackageByID); 
router.put('/:id', packageController.updatePackage);
router.delete('/:id', packageController.deletePackage);

module.exports = router;