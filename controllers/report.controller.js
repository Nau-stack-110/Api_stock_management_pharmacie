const { Order, OrderDetail, Product, User, sequelize } = require('../models');
/**
 * Rapport des produits les plus vendus
 * Regroupe les OrderDetail par product_id et calcule la quantité totale vendue.
 */
exports.getBestSellingProducts = async (req, res) => {
  try {
    const bestSellingProducts = await OrderDetail.findAll({
      attributes: [
        'product_id',
        [sequelize.fn('SUM', sequelize.col('OrderDetail.quantite')), 'totalQuantity']
      ],
      include: [{
        model: Product,
        attributes: ['nom', 'categorie', 'reference', 'fournisseur']
      }],
      group: ['product_id', 'Product.id'],
      order: [[sequelize.literal('totalQuantity'), 'DESC']],
      limit: 5
    });
    res.status(200).json(bestSellingProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server internal error" });
  }
};

/**
 * Rapport des ventes par un vendeur 
 */
exports.getSalesReportBySeller = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const report = await Order.findAll({
      attributes: [
        'user_id',
        [sequelize.fn('COUNT', sequelize.col('Order.id')), 'totalOrders'],
        [sequelize.fn('SUM', sequelize.col('Order.prix_total')), 'totalSales']
      ],
      where: {
        user_id: sellerId
      },
      group: ['user_id'],
      include: [{
        model: User,
        attributes: ['id', 'name', 'email']
      }]
    });
    res.status(200).json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

/**
 * Rapport des ventes par jour
 * Regroupe les commandes par la date (extrait de createdAt)
 */
exports.getDailySalesReport = async (req, res) => {
  try {
    const report = await Order.findAll({
      attributes: [
        [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
        [sequelize.fn('SUM', sequelize.col('prix_total')), 'totalSales'],
        [sequelize.fn('COUNT', sequelize.col('Order.id')), 'totalOrders']
      ],
      group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
      order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'ASC']]
    });
    res.status(200).json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

/**
 * Rapport des ventes par semaine
 * Utilise la fonction SQL WEEK pour grouper les commandes par semaine de création.
 */
exports.getWeeklySalesReport = async (req, res) => {
  try {
    const report = await Order.findAll({
      attributes: [
        [sequelize.fn('WEEK', sequelize.col('createdAt')), 'week'],
        [sequelize.fn('SUM', sequelize.col('prix_total')), 'totalSales'],
        [sequelize.fn('COUNT', sequelize.col('Order.id')), 'totalOrders']
      ],
      group: [sequelize.fn('WEEK', sequelize.col('createdAt'))],
      order: [[sequelize.fn('WEEK', sequelize.col('createdAt')), 'ASC']]
    });
    res.status(200).json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

/**
 * Rapport des ventes par mois
 */
exports.getMonthlySalesReport = async (req, res) => {
  try {
    const report = await Order.findAll({
      attributes: [
        [sequelize.fn('MONTH', sequelize.col('createdAt')), 'month'],
        [sequelize.fn('SUM', sequelize.col('prix_total')), 'totalSales'],
        [sequelize.fn('COUNT', sequelize.col('Order.id')), 'totalOrders']
      ],
      group: [sequelize.fn('MONTH', sequelize.col('createdAt'))],
      order: [[sequelize.fn('MONTH', sequelize.col('createdAt')), 'ASC']]
    });
    res.status(200).json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

/**
 * Rapport de rotation des stocks
 * Calcule le ratio (quantité vendue / stock actuel) pour chaque produit
 */
exports.getStockRotation = async (req, res) => {
  try {
    const stockRotation = await OrderDetail.findAll({
      attributes: [
        'product_id',
        [sequelize.fn('SUM', sequelize.col('OrderDetail.quantite')), 'totalSold'],
        [sequelize.col('Product.quantite'), 'currentStock'],
        [
          sequelize.literal('ROUND(COALESCE(SUM(OrderDetail.quantite) / NULLIF(Product.quantite, 0), 0), 2)'),
          'rotationRatio'
        ]
      ],
      include: [{
        model: Product,
        attributes: ['nom', 'categorie', 'reference', 'quantite']
      }],
      group: ['product_id', 'Product.id'],
      order: [[sequelize.literal('rotationRatio'), 'DESC']],
      limit: 20
    });

    res.status(200).json(stockRotation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}; 
