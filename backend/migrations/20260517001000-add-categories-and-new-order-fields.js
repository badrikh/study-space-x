'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const tables = await queryInterface.showAllTables();
    const hasCategories = tables.some((table) => table.toLowerCase() === 'categories');

    if (!hasCategories) {
      await queryInterface.createTable('categories', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
    }

    const menus = await queryInterface.describeTable('menus');

    if (!menus.categoryId) {
      await queryInterface.addColumn('menus', 'categoryId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }

    if (!menus.image) {
      await queryInterface.addColumn('menus', 'image', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    const orders = await queryInterface.describeTable('orders');

    if (!orders.items) {
      await queryInterface.addColumn('orders', 'items', {
        type: Sequelize.JSON,
        allowNull: true,
      });
    }

    if (!orders.total) {
      await queryInterface.addColumn('orders', 'total', {
        type: Sequelize.FLOAT,
        allowNull: true,
      });
    }

    if (!orders.userId) {
      await queryInterface.addColumn('orders', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  },

  async down(queryInterface) {
    const orders = await queryInterface.describeTable('orders');
    const menus = await queryInterface.describeTable('menus');

    if (orders.userId) await queryInterface.removeColumn('orders', 'userId');
    if (orders.total) await queryInterface.removeColumn('orders', 'total');
    if (orders.items) await queryInterface.removeColumn('orders', 'items');
    if (menus.image) await queryInterface.removeColumn('menus', 'image');
    if (menus.categoryId) await queryInterface.removeColumn('menus', 'categoryId');

    await queryInterface.dropTable('categories');
  },
};
