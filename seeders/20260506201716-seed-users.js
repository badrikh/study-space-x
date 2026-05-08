'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      {
        name: "Ahmad Khalil",
        email: "ahmad.khalil@gmail.com",
        phoneNumber: "0599123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sara Mansour",
        email: "sara.mansour@gmail.com",
        phoneNumber: "0598765432",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Mohammed Ali",
        email: "mohammed.ali@yahoo.com",
        phoneNumber: "0597654321",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Lana Haddad",
        email: "lana.haddad@hotmail.com",
        phoneNumber: "0596543210",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Kareem Nasser",
        email: "kareem.nasser@gmail.com",
        phoneNumber: "0595432109",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};