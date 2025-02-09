const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { CheckToken, CheckAdmin } = require('../middlewares/authorize');

router.get('/best-seller-products',[CheckToken, CheckAdmin], reportController.getBestSellingProducts);
router.get('/sales/seller/:sellerId',[CheckToken, CheckAdmin], reportController.getSalesReportBySeller);
router.get('/sales/daily',[CheckToken, CheckAdmin], reportController.getDailySalesReport);
router.get('/sales/weekly',[CheckToken, CheckAdmin], reportController.getWeeklySalesReport);
router.get('/sales/monthly', [CheckToken, CheckAdmin], reportController.getMonthlySalesReport);

module.exports = router;