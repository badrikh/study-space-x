'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    try {

      // 🔥 Reset only Users (safe, باقي الجداول ما بتتأثر)
      await queryInterface.bulkDelete('Users', null, {});

      console.log('Inserting Users...');
      await queryInterface.bulkInsert('Users', [
        {
          id: 1,
          name: 'Ahmad Khalil',
          email: 'ahmad1@gmail.com',
          phoneNumber: '0599000001',
          password: await bcrypt.hash('123456', 10),
          createdAt: now,
          updatedAt: now
        },
        {
          id: 2,
          name: 'Sara Ali',
          email: 'sara2@gmail.com',
          phoneNumber: '0599000002',
          password: await bcrypt.hash('123456', 10),
          createdAt: now,
          updatedAt: now
        },
        {
          id: 3,
          name: 'Omar Yasin',
          email: 'omar3@gmail.com',
          phoneNumber: '0599000003',
          password: await bcrypt.hash('123456', 10),
          createdAt: now,
          updatedAt: now
        },
        {
          id: 4,
          name: 'Lina Hasan',
          email: 'lina4@gmail.com',
          phoneNumber: '0599000004',
          password: await bcrypt.hash('123456', 10),
          createdAt: now,
          updatedAt: now
        },
        {
          id: 5,
          name: 'Khaled Nasser',
          email: 'khaled5@gmail.com',
          phoneNumber: '0599000005',
          password: await bcrypt.hash('123456', 10),
          createdAt: now,
          updatedAt: now
        },
        {
          id: 6,
          name: 'Maya Said',
          email: 'maya6@gmail.com',
          phoneNumber: '0599000006',
          password: await bcrypt.hash('123456', 10),
          createdAt: now,
          updatedAt: now
        },
        {
          id: 7,
          name: 'Yousef Ali',
          email: 'yousef7@gmail.com',
          phoneNumber: '0599000007',
          password: await bcrypt.hash('123456', 10),
          createdAt: now,
          updatedAt: now
        }
      ]);

      console.log('✅ Users done');

      // ================= MENUS =================
      await queryInterface.bulkInsert('Menus', [
        { id: 1, name: 'Burger', price: 15, itemNumber: 1, description: 'Tasty burger', createdAt: now, updatedAt: now },
        { id: 2, name: 'Pizza', price: 25, itemNumber: 2, description: 'Cheese pizza', createdAt: now, updatedAt: now },
        { id: 3, name: 'Pasta', price: 18, itemNumber: 3, description: 'Italian pasta', createdAt: now, updatedAt: now },
        { id: 4, name: 'Fries', price: 8, itemNumber: 4, description: 'Crispy fries', createdAt: now, updatedAt: now },
        { id: 5, name: 'Steak', price: 35, itemNumber: 5, description: 'Grilled steak', createdAt: now, updatedAt: now },
        { id: 6, name: 'Salad', price: 12, itemNumber: 6, description: 'Fresh salad', createdAt: now, updatedAt: now },
        { id: 7, name: 'Juice', price: 6, itemNumber: 7, description: 'Fresh juice', createdAt: now, updatedAt: now }
      ]);

      console.log('✅ Menus done');

      // ================= SEATS =================
      await queryInterface.bulkInsert('Seats', [
        { id: 1, seatNumber: 1, status: 'available', createdAt: now, updatedAt: now },
        { id: 2, seatNumber: 2, status: 'available', createdAt: now, updatedAt: now },
        { id: 3, seatNumber: 3, status: 'available', createdAt: now, updatedAt: now },
        { id: 4, seatNumber: 4, status: 'available', createdAt: now, updatedAt: now },
        { id: 5, seatNumber: 5, status: 'occupied', createdAt: now, updatedAt: now },
        { id: 6, seatNumber: 6, status: 'available', createdAt: now, updatedAt: now },
        { id: 7, seatNumber: 7, status: 'occupied', createdAt: now, updatedAt: now }
      ]);

      console.log('✅ Seats done');

      // ================= TIME SLOTS =================
      await queryInterface.bulkInsert('TimeSlots', [
        { id: 1, time: '09:00 - 11:00', status: 'available', createdAt: now, updatedAt: now },
        { id: 2, time: '11:00 - 13:00', status: 'available', createdAt: now, updatedAt: now },
        { id: 3, time: '13:00 - 15:00', status: 'available', createdAt: now, updatedAt: now }
      ]);

      console.log('✅ TimeSlots done');

      // ================= BOOKINGS =================
      await queryInterface.bulkInsert('Bookings', [
        { id: 1, date: now, people: 2, userId: 1, seatId: 1, timeSlotId: 1, createdAt: now, updatedAt: now },
        { id: 2, date: now, people: 3, userId: 2, seatId: 2, timeSlotId: 2, createdAt: now, updatedAt: now },
        { id: 3, date: now, people: 1, userId: 3, seatId: 3, timeSlotId: 1, createdAt: now, updatedAt: now },
        { id: 4, date: now, people: 4, userId: 4, seatId: 4, timeSlotId: 2, createdAt: now, updatedAt: now },
        { id: 5, date: now, people: 2, userId: 5, seatId: 5, timeSlotId: 3, createdAt: now, updatedAt: now },
        { id: 6, date: now, people: 3, userId: 6, seatId: 6, timeSlotId: 1, createdAt: now, updatedAt: now },
        { id: 7, date: now, people: 1, userId: 7, seatId: 7, timeSlotId: 2, createdAt: now, updatedAt: now }
      ]);

      console.log('✅ Bookings done');

      // ================= ORDERS =================
      await queryInterface.bulkInsert('Orders', [
        { id: 1, order_name: 'Order 1', order_date: now, prices: 15, total_cost: 15, user_id: 1, menu_id: 1, createdAt: now, updatedAt: now },
        { id: 2, order_name: 'Order 2', order_date: now, prices: 25, total_cost: 25, user_id: 2, menu_id: 2, createdAt: now, updatedAt: now },
        { id: 3, order_name: 'Order 3', order_date: now, prices: 18, total_cost: 18, user_id: 3, menu_id: 3, createdAt: now, updatedAt: now },
        { id: 4, order_name: 'Order 4', order_date: now, prices: 8, total_cost: 8, user_id: 4, menu_id: 4, createdAt: now, updatedAt: now },
        { id: 5, order_name: 'Order 5', order_date: now, prices: 35, total_cost: 35, user_id: 5, menu_id: 5, createdAt: now, updatedAt: now },
        { id: 6, order_name: 'Order 6', order_date: now, prices: 12, total_cost: 12, user_id: 6, menu_id: 6, createdAt: now, updatedAt: now },
        { id: 7, order_name: 'Order 7', order_date: now, prices: 6, total_cost: 6, user_id: 7, menu_id: 7, createdAt: now, updatedAt: now }
      ]);

      console.log('✅ Orders done');

      // ================= PAYMENTS =================
      await queryInterface.bulkInsert('Payments', [
        { id: 1, userId: 1, bookingId: 1, amount: 15, method: 'Cash', status: 'paid', createdAt: now, updatedAt: now },
        { id: 2, userId: 2, bookingId: 2, amount: 25, method: 'Card', status: 'paid', createdAt: now, updatedAt: now },
        { id: 3, userId: 3, bookingId: 3, amount: 18, method: 'Cash', status: 'pending', createdAt: now, updatedAt: now },
        { id: 4, userId: 4, bookingId: 4, amount: 8, method: 'Card', status: 'paid', createdAt: now, updatedAt: now },
        { id: 5, userId: 5, bookingId: 5, amount: 35, method: 'Cash', status: 'paid', createdAt: now, updatedAt: now },
        { id: 6, userId: 6, bookingId: 6, amount: 12, method: 'Card', status: 'pending', createdAt: now, updatedAt: now },
        { id: 7, userId: 7, bookingId: 7, amount: 6, method: 'Cash', status: 'paid', createdAt: now, updatedAt: now }
      ]);

      console.log('✅ Payments done');

    } catch (err) {
      console.error('❌ FAILED AT:', err.message);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Payments', null, {});
    await queryInterface.bulkDelete('Orders', null, {});
    await queryInterface.bulkDelete('Bookings', null, {});
    await queryInterface.bulkDelete('TimeSlots', null, {});
    await queryInterface.bulkDelete('Seats', null, {});
    await queryInterface.bulkDelete('Menus', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};