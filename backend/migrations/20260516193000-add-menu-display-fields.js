'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const menus = await queryInterface.describeTable('menus');

    if (!menus.category) {
      await queryInterface.addColumn('menus', 'category', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Food',
      });
    }

    if (!menus.imageUrl) {
      await queryInterface.addColumn('menus', 'imageUrl', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    if (!menus.isAvailable) {
      await queryInterface.addColumn('menus', 'isAvailable', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      });
    }
  },

  async down(queryInterface) {
    const menus = await queryInterface.describeTable('menus');

    if (menus.isAvailable) {
      await queryInterface.removeColumn('menus', 'isAvailable');
    }

    if (menus.imageUrl) {
      await queryInterface.removeColumn('menus', 'imageUrl');
    }

    if (menus.category) {
      await queryInterface.removeColumn('menus', 'category');
    }
  },
};
