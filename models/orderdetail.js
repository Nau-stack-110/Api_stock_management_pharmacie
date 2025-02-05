'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      OrderDetail.belongsTo(models.Order, {foreignKey:"order_id"});
      OrderDetail.belongsTo(models.Product, {foreignKey:"product_id"});
    }
  }
  OrderDetail.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantite: DataTypes.INTEGER,
    unit_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};