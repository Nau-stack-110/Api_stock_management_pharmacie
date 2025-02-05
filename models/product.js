'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.OrderDetail, {foreignKey:'product_id'});
    }
  }
  Product.init({
    nom: DataTypes.STRING,
    categorie: DataTypes.STRING,
    reference: DataTypes.STRING,
    prix: DataTypes.INTEGER,
    quantite: DataTypes.INTEGER,
    fournisseur: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};