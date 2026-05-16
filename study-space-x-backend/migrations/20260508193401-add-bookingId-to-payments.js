'use strict';
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('payments', 'bookingId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'bookings',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('payments', 'bookingId');
  }
};
