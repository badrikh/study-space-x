'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Menus', [
      {
        name: "Espresso",
        price: 8,
        itemNumber: 1,
        description: "Strong black coffee",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Americano",
        price: 10,
        itemNumber: 2,
        description: "Espresso with hot water",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cappuccino",
        price: 12,
        itemNumber: 3,
        description: "Coffee with milk foam",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Latte",
        price: 14,
        itemNumber: 4,
        description: "Milk coffee",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Mocha",
        price: 15,
        itemNumber: 5,
        description: "Chocolate coffee",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Iced Coffee",
        price: 11,
        itemNumber: 6,
        description: "Cold coffee with ice",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  

  async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Menus', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
