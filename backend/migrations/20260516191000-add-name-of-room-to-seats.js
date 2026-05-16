'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const seats = await queryInterface.describeTable('seats');

    if (!seats.name_of_room) {
      await queryInterface.addColumn('seats', 'name_of_room', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  async down(queryInterface) {
    const seats = await queryInterface.describeTable('seats');

    if (seats.name_of_room) {
      await queryInterface.removeColumn('seats', 'name_of_room');
    }
  },
};
