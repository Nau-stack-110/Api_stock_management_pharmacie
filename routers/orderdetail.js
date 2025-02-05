const express = require('express');
const router = express.Router();
const { CheckToken, CheckAdmin } = require("../middlewares/authorize");
const orderDetailController = require('../controllers/orderdetail.controller');

router.get('/', CheckToken, orderDetailController.getAllOrderDetails);

router.get('/:id', CheckToken, orderDetailController.getOrderDetailById);

router.post('/', CheckToken, orderDetailController.createOrderDetail);

router.put('/:id/update', CheckToken, orderDetailController.updateOrderDetailById);

router.delete('/:id/delete', [CheckToken, CheckAdmin], orderDetailController.deleteOrderDetailById);

module.exports = router;