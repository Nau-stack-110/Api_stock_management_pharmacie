const express = require('express');
const router = express.Router();
const { CheckToken } = require("../middlewares/authorize");
const orderController = require('../controllers/order.controller');

router.get('/', CheckToken, orderController.getAllOrders);

router.get('/:id', CheckToken, orderController.getOrderById);

router.post('/', CheckToken, orderController.createOrder);

router.put('/:id/update', CheckToken, orderController.updateOrderById);

router.delete('/:id/delete', CheckToken, orderController.deleteOrderById);

module.exports = router;
