const { OrderDetail, Order, Product } = require('../models');

exports.getAllOrderDetails = async (req, res) => {
  try {
    const orderDetails = await OrderDetail.findAll({
      include: [
        { model: Order },
        { model: Product }
      ]
    });
    res.status(200).json(orderDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getOrderDetailById = async (req, res) => {
  try {
    const orderDetail = await OrderDetail.findByPk(req.params.id, {
      include: [
        { model: Order },
        { model: Product }
      ]
    });
    if (!orderDetail) {
      return res.status(404).json({ message: "Order Detail not found" });
    }
    res.status(200).json(orderDetail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};


