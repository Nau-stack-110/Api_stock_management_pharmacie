'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasMany(models.OrderDetail, {foreignKey:'order_id'});
      Order.belongsTo(models.User, {foreignKey:'user_id'});
    }
  }
  Order.init({
    user_id: DataTypes.INTEGER,
    prix_total: DataTypes.INTEGER,
    status: DataTypes.ENUM('en attente','confirmé','annulée')
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};