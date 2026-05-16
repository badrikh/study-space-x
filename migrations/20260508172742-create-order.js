'use strict';
/** @type {import('sequelize-cli').Migration} */

export default {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Orders', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      order_name: {
        type: Sequelize.STRING
      },

      prices: {
        type: Sequelize.FLOAT
      },

      total_cost: {
        type: Sequelize.FLOAT
      },

      order_date: {
        type: Sequelize.DATE
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // مهم عشان ما يوقف المايغريشن
        // تم حذف الـ foreign key مؤقتاً لتفادي الخطأ
      },

      menu_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Menus',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Orders');
  }
};
