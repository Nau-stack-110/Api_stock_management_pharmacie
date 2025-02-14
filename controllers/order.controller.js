const { Order, OrderDetail, User, Product, sequelize } = require('../models');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderDetail,
          attributes: ['id', 'product_id', 'order_id', 'quantite', 'unit_price']
        },
        {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      ]
    });
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderDetail,
        },
        {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      ]
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const user_id = req.user.id;
    const { status, orderDetails } = req.body;
    let prix_total = 0;

    const order = await Order.create({ user_id, prix_total: 0, status }, { transaction: t });
    
    if (orderDetails && Array.isArray(orderDetails)) {
      for (const detail of orderDetails) {
        const { product_id, quantite } = detail;
        
        const product = await Product.findByPk(product_id, { transaction: t });
        if (!product) {
          throw new Error(`Produit avec l'id ${product_id} non trouvé`);
        }
        
        if (product.quantite < quantite) {
          throw new Error(`Stock insuffisant pour le produit avec l'id ${product_id}`);
        }
        
        const unit_price = product.prix;
        prix_total += unit_price * quantite;
        
        await OrderDetail.create({
          order_id: order.id,
          product_id,
          quantite,
          unit_price,
        }, { transaction: t });
        
        const newQuantity = product.quantite - quantite;
        await product.update({ quantite: newQuantity }, { transaction: t });
      }
    }
    
    await order.update({ prix_total }, { transaction: t });
    
    // Valider la transaction
    await t.commit();
    
    res.status(201).json(order);
  } catch (err) {
    // Annuler la transaction en cas d'erreur
    await t.rollback();

    // Transmettre le message d'erreur approprié selon le cas
    if (err.message && err.message.includes('Stock insuffisant')) {
      return res.status(400).json({ message: err.message });
    }
    if (err.message && err.message.includes('non trouvé')) {
      return res.status(404).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

exports.updateOrderById = async (req, res) => {
  try {
    const { user_id, prix_total, status } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.update({ user_id, prix_total, status });
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await OrderDetail.destroy({ where: { order_id: order.id } });
    await order.destroy();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
