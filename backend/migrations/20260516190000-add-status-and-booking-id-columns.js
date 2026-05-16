'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const bookings = await queryInterface.describeTable('bookings');
    const orders = await queryInterface.describeTable('orders');

    if (!bookings.status) {
      await queryInterface.addColumn('bookings', 'status', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending',
      });
    }

    if (!orders.status) {
      await queryInterface.addColumn('orders', 'status', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending',
      });
    }

    if (!orders.booking_id) {
      await queryInterface.addColumn('orders', 'booking_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'bookings',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  },

  async down(queryInterface) {
    const bookings = await queryInterface.describeTable('bookings');
    const orders = await queryInterface.describeTable('orders');

    if (orders.booking_id) {
      await queryInterface.removeColumn('orders', 'booking_id');
    }

    if (orders.status) {
      await queryInterface.removeColumn('orders', 'status');
    }

    if (bookings.status) {
      await queryInterface.removeColumn('bookings', 'status');
    }
  },
};
