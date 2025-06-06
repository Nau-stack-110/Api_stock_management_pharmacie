'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      User.belongsTo(models.Role, {foreignKey:'role_id'});
      User.hasMany(models.Order, {foreignKey:'user_id'});
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    tel: DataTypes.INTEGER,
    image: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    resetPin: DataTypes.INTEGER,
    pinExpiry: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};