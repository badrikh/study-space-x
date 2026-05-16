'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('payments');

    if (!table.userId) {
      await queryInterface.addColumn('payments', 'userId', {
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

    if (table.paymentMethod && !table.method) {
      await queryInterface.renameColumn('payments', 'paymentMethod', 'method');
    }
  },

  async down(queryInterface) {
    const table = await queryInterface.describeTable('payments');

    if (table.method && !table.paymentMethod) {
      await queryInterface.renameColumn('payments', 'method', 'paymentMethod');
    }

    if (table.userId) {
      await queryInterface.removeColumn('payments', 'userId');
    }
  },
};
