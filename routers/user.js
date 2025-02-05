const express = require("express");
const userController = require("../controllers/user.controller");
const { CheckToken, CheckVendeur } = require("../middlewares/authorize");
const router = express.Router();
// profile
router.get('/me',[ CheckToken, CheckVendeur], userController.getMyProfile );
router.put('/me', [CheckToken, CheckVendeur], userController.updateMyProfile);

router.delete('/me/delete', [CheckToken, ], userController.deleteMyProfile);
router.put('/me/password/change', [CheckToken, CheckVendeur], userController.changepassword);


module.exports = router;
