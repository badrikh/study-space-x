'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Payments', 'bookingId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Bookings',
        key: 'id'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Payments', 'bookingId');
  }
};