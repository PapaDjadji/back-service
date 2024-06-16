
const express = require('express');
const router = express.Router();
const deliveryController = require('./delivery');

router.post('/', deliveryController.createDelivery);
router.get('/', deliveryController.getAllDelivery);
router.get('/:id', deliveryController.getDeliveryByID); 
router.put('/:id', deliveryController.updateDelivery);
router.delete('/:id', deliveryController.deleteDelivery);

module.exports = router;