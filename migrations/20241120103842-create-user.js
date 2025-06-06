'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      tel: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Roles',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      resetPin: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      pinExpiry: {
        type: Sequelize.DATE,
        allowNull:true,
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
    await queryInterface.dropTable('Users');
  }
};