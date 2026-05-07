'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    const now = new Date();

    // ================= USERS =================
    await queryInterface.bulkInsert('Users', [
      { id: 1, name: 'Ahmad Khalil', email: 'ahmad@gmail.com', phoneNumber: '0599123451', createdAt: now, updatedAt: now },
      { id: 2, name: 'Sara Ali', email: 'sara@gmail.com', phoneNumber: '0599123452', createdAt: now, updatedAt: now },
      { id: 3, name: 'Omar Yasin', email: 'omar@gmail.com', phoneNumber: '0599123453', createdAt: now, updatedAt: now },
      { id: 4, name: 'Lina Hasan', email: 'lina@gmail.com', phoneNumber: '0599123454', createdAt: now, updatedAt: now },
      { id: 5, name: 'Khaled Nasser', email: 'khaled@gmail.com', phoneNumber: '0599123455', createdAt: now, updatedAt: now },
      { id: 6, name: 'Maya Said', email: 'maya@gmail.com', phoneNumber: '0599123456', createdAt: now, updatedAt: now },
      { id: 7, name: 'Yousef Ali', email: 'yousef@gmail.com', phoneNumber: '0599123457', createdAt: now, updatedAt: now }
    ]);

    // ================= ADMINS =================
    await queryInterface.bulkInsert('Admins', [
      { id: 1, name: 'Main Admin', email: 'admin1@restaurant.com', createdAt: now, updatedAt: now },
      { id: 2, name: 'Admin 2', email: 'admin2@restaurant.com', createdAt: now, updatedAt: now },
      { id: 3, name: 'Admin 3', email: 'admin3@restaurant.com', createdAt: now, updatedAt: now },
      { id: 4, name: 'Admin 4', email: 'admin4@restaurant.com', createdAt: now, updatedAt: now },
      { id: 5, name: 'Admin 5', email: 'admin5@restaurant.com', createdAt: now, updatedAt: now },
      { id: 6, name: 'Admin 6', email: 'admin6@restaurant.com', createdAt: now, updatedAt: now },
      { id: 7, name: 'Admin 7', email: 'admin7@restaurant.com', createdAt: now, updatedAt: now }
    ]);

    // ================= MENUS =================
    await queryInterface.bulkInsert('Menus', [
      { id: 1, name: 'Burger', price: 15, itemNumber: 'M001', createdAt: now, updatedAt: now },
      { id: 2, name: 'Pizza', price: 25, itemNumber: 'M002', createdAt: now, updatedAt: now },
      { id: 3, name: 'Pasta', price: 18, itemNumber: 'M003', createdAt: now, updatedAt: now },
      { id: 4, name: 'Fries', price: 8, itemNumber: 'M004', createdAt: now, updatedAt: now },
      { id: 5, name: 'Steak', price: 35, itemNumber: 'M005', createdAt: now, updatedAt: now },
      { id: 6, name: 'Salad', price: 12, itemNumber: 'M006', createdAt: now, updatedAt: now },
      { id: 7, name: 'Juice', price: 6, itemNumber: 'M007', createdAt: now, updatedAt: now }
    ]);

    // ================= ORDERS =================
    await queryInterface.bulkInsert('Orders', [
      { id: 1, orderName: 'Order 1', orderDate: now, totalCost: 40, userId: 1, createdAt: now, updatedAt: now },
      { id: 2, orderName: 'Order 2', orderDate: now, totalCost: 55, userId: 2, createdAt: now, updatedAt: now },
      { id: 3, orderName: 'Order 3', orderDate: now, totalCost: 30, userId: 3, createdAt: now, updatedAt: now },
      { id: 4, orderName: 'Order 4', orderDate: now, totalCost: 70, userId: 4, createdAt: now, updatedAt: now },
      { id: 5, orderName: 'Order 5', orderDate: now, totalCost: 25, userId: 5, createdAt: now, updatedAt: now },
      { id: 6, orderName: 'Order 6', orderDate: now, totalCost: 90, userId: 6, createdAt: now, updatedAt: now },
      { id: 7, orderName: 'Order 7', orderDate: now, totalCost: 60, userId: 7, createdAt: now, updatedAt: now }
    ]);

    // ================= BOOKINGS =================
    await queryInterface.bulkInsert('Bookings', [
      { id: 1, bookingDate: now, userId: 1, createdAt: now, updatedAt: now },
      { id: 2, bookingDate: now, userId: 2, createdAt: now, updatedAt: now },
      { id: 3, bookingDate: now, userId: 3, createdAt: now, updatedAt: now },
      { id: 4, bookingDate: now, userId: 4, createdAt: now, updatedAt: now },
      { id: 5, bookingDate: now, userId: 5, createdAt: now, updatedAt: now },
      { id: 6, bookingDate: now, userId: 6, createdAt: now, updatedAt: now },
      { id: 7, bookingDate: now, userId: 7, createdAt: now, updatedAt: now }
    ]);

    // ================= PAYMENTS =================
    await queryInterface.bulkInsert('Payments', [
      { id: 1, paymentNumber: 'PAY001', method: 'Cash', amount: 40, createdAt: now, updatedAt: now },
      { id: 2, paymentNumber: 'PAY002', method: 'Card', amount: 55, createdAt: now, updatedAt: now },
      { id: 3, paymentNumber: 'PAY003', method: 'Cash', amount: 30, createdAt: now, updatedAt: now },
      { id: 4, paymentNumber: 'PAY004', method: 'Card', amount: 70, createdAt: now, updatedAt: now },
      { id: 5, paymentNumber: 'PAY005', method: 'Cash', amount: 25, createdAt: now, updatedAt: now },
      { id: 6, paymentNumber: 'PAY006', method: 'Card', amount: 90, createdAt: now, updatedAt: now },
      { id: 7, paymentNumber: 'PAY007', method: 'Cash', amount: 60, createdAt: now, updatedAt: now }
    ]);

    // ================= TABLES =================
    await queryInterface.bulkInsert('Tables', [
      { id: 1, nameOfRoom: 'Hall A', numberOfTables: 10, status: 'available', createdAt: now, updatedAt: now },
      { id: 2, nameOfRoom: 'Hall B', numberOfTables: 5, status: 'reserved', createdAt: now, updatedAt: now },
      { id: 3, nameOfRoom: 'Hall C', numberOfTables: 8, status: 'available', createdAt: now, updatedAt: now },
      { id: 4, nameOfRoom: 'Hall D', numberOfTables: 6, status: 'reserved', createdAt: now, updatedAt: now },
      { id: 5, nameOfRoom: 'Hall E', numberOfTables: 12, status: 'available', createdAt: now, updatedAt: now },
      { id: 6, nameOfRoom: 'Hall F', numberOfTables: 4, status: 'maintenance', createdAt: now, updatedAt: now },
      { id: 7, nameOfRoom: 'Hall G', numberOfTables: 9, status: 'available', createdAt: now, updatedAt: now }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Payments', null, {});
    await queryInterface.bulkDelete('Bookings', null, {});
    await queryInterface.bulkDelete('Orders', null, {});
    await queryInterface.bulkDelete('Menus', null, {});
    await queryInterface.bulkDelete('Admins', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Tables', null, {});
  }
};