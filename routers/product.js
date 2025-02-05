const express = require('express');
const router = express.Router();
const { CheckToken, CheckAdmin } = require("../middlewares/authorize");
const productController = require('../controllers/product.controller');


router.get('/', [CheckToken], productController.getAllProduct);
router.get('/:id', [CheckToken], productController.getProductById);

router.post('/', [CheckToken, CheckAdmin], productController.createProduct);
router.post('/betsaka', [CheckToken, CheckAdmin], productController.createProductPls);

router.put('/:id/update/', [CheckToken, CheckAdmin], productController.updateProductById);

router.delete('/:id/delete/', [CheckToken, CheckAdmin], productController.deleteProductById);
router.delete('/delete/all/', [CheckToken, CheckAdmin], productController.deleteAllProduct);


module.exports = router;


