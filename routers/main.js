const express = require("express");
const mainRouter = express.Router();

const userRouter = require("./user");
const authRouter = require("./auth");
const adminRouter = require("./admin");
const productRouter = require("./product");
const orderRouter = require("./order");
const orderDetailsRouter = require("./orderdetail");


mainRouter.use("/auth", authRouter);
mainRouter.use("/admin", adminRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/products", productRouter);
mainRouter.use("/orders", orderRouter);
mainRouter.use("/order-details", orderDetailsRouter);



module.exports = mainRouter;
