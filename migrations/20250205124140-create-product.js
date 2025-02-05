'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING,
        allowNull:false
      },
      categorie: {
        type: Sequelize.STRING,
        allowNull:false
      },
      reference: {
        type: Sequelize.STRING,
        allowNull:false
      },
      prix: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      quantite: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      fournisseur: {
        type: Sequelize.STRING,
        allowNull:false
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
    await queryInterface.dropTable('Products');
  }
};