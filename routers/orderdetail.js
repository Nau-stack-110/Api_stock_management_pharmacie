const express = require('express');
const router = express.Router();
const { CheckToken } = require("../middlewares/authorize");
const orderDetailController = require('../controllers/orderdetail.controller');

router.get('/', CheckToken, orderDetailController.getAllOrderDetails);

router.get('/:id', CheckToken, orderDetailController.getOrderDetailById);


module.exports = router;       