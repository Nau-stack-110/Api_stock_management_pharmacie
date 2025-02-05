'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Orders",
          key:"id",
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE",
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Products",
          key:"id",
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE",
      },
      quantite: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      unit_price: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderDetails');
  }
};