'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    try {
      // RESET
      await queryInterface.bulkDelete('Payments', null, {});
      await queryInterface.bulkDelete('Orders', null, {});
      await queryInterface.bulkDelete('Bookings', null, {});
      await queryInterface.bulkDelete('TimeSlots', null, {});
      await queryInterface.bulkDelete('Seats', null, {});
      await queryInterface.bulkDelete('Menus', null, {});
      await queryInterface.bulkDelete('Users', null, {});

      // ================= USERS =================
      await queryInterface.bulkInsert('Users', [
        { name: 'Ahmad Khalil', email: 'ahmad1@gmail.com', phone_number: '0599000001', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Sara Ali', email: 'sara2@gmail.com', phone_number: '0599000002', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Omar Yasin', email: 'omar3@gmail.com', phone_number: '0599000003', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Lina Hasan', email: 'lina4@gmail.com', phone_number: '0599000004', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Khaled Nasser', email: 'khaled5@gmail.com', phone_number: '0599000005', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Maya Said', email: 'maya6@gmail.com', phone_number: '0599000006', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Yousef Ali', email: 'yousef7@gmail.com', phone_number: '0599000007', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Nour Hamdan', email: 'nour8@gmail.com', phone_number: '0599000008', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Tamer Zaid', email: 'tamer9@gmail.com', phone_number: '0599000009', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Hana Farah', email: 'hana10@gmail.com', phone_number: '0599000010', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Zaid Khaled', email: 'zaid11@gmail.com', phone_number: '0599000011', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Rana Ali', email: 'rana12@gmail.com', phone_number: '0599000012', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Bilal Omar', email: 'bilal13@gmail.com', phone_number: '0599000013', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Dina Taha', email: 'dina14@gmail.com', phone_number: '0599000014', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Fares Jaber', email: 'fares15@gmail.com', phone_number: '0599000015', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Lara Hamdan', email: 'lara16@gmail.com', phone_number: '0599000016', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Sami Nasser', email: 'sami17@gmail.com', phone_number: '0599000017', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Rima Khalil', email: 'rima18@gmail.com', phone_number: '0599000018', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Tariq Said', email: 'tariq19@gmail.com', phone_number: '0599000019', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
        { name: 'Huda Omar', email: 'huda20@gmail.com', phone_number: '0599000020', password: await bcrypt.hash('123456', 10), createdAt: now, updatedAt: now },
      ]);

      // ================= MENUS =================
      await queryInterface.bulkInsert('Menus', [
        { name: 'Latte', price: 4.5, itemNumber: 1, description: 'Smooth espresso with steamed milk', createdAt: now, updatedAt: now },
        { name: 'Espresso', price: 3.0, itemNumber: 2, description: 'Strong and bold coffee shot', createdAt: now, updatedAt: now },
        { name: 'Cappuccino', price: 4.0, itemNumber: 3, description: 'Espresso with foamy milk', createdAt: now, updatedAt: now },
        { name: 'Americano', price: 3.5, itemNumber: 4, description: 'Espresso diluted with hot water', createdAt: now, updatedAt: now },
        { name: 'Mocha', price: 5.0, itemNumber: 5, description: 'Espresso with chocolate & cream', createdAt: now, updatedAt: now },
        { name: 'Flat White', price: 4.5, itemNumber: 6, description: 'Double espresso with velvety microfoam', createdAt: now, updatedAt: now },
        { name: 'Affogato', price: 5.5, itemNumber: 7, description: 'Vanilla gelato drowned in espresso', createdAt: now, updatedAt: now },
        { name: 'Hot Tea', price: 2.5, itemNumber: 8, description: 'A calming cup of tea', createdAt: now, updatedAt: now },
        { name: 'Matcha Latte', price: 5.0, itemNumber: 9, description: 'Creamy Japanese matcha latte', createdAt: now, updatedAt: now },
        { name: 'Iced Coffee', price: 4.25, itemNumber: 10, description: 'Chilled coffee over ice', createdAt: now, updatedAt: now },
        { name: 'Cold Brew', price: 4.75, itemNumber: 11, description: 'Slow steeped cold brew', createdAt: now, updatedAt: now },
        { name: 'Croissant', price: 3.5, itemNumber: 12, description: 'Buttery flaky pastry', createdAt: now, updatedAt: now },
        { name: 'Muffin', price: 3.0, itemNumber: 13, description: 'Soft fresh baked muffin', createdAt: now, updatedAt: now },
        { name: 'Brownie', price: 3.25, itemNumber: 14, description: 'Rich chocolate brownie', createdAt: now, updatedAt: now },
        { name: 'Sandwich', price: 6.5, itemNumber: 15, description: 'Freshly made savory sandwich', createdAt: now, updatedAt: now },
        { name: 'Avocado Toast', price: 6.0, itemNumber: 16, description: 'Crisp toast with avocado', createdAt: now, updatedAt: now },
        { name: 'Smoothie', price: 5.5, itemNumber: 17, description: 'Fruit smoothie blend', createdAt: now, updatedAt: now },
        { name: 'Cookie', price: 2.25, itemNumber: 18, description: 'Fresh baked cookie', createdAt: now, updatedAt: now },
      ]);

      // ================= SEATS =================
      await queryInterface.bulkInsert('Seats', [
        { name_of_room: 'Main Hall', number_of_tables: 4, status: 'available', createdAt: now, updatedAt: now },
        { name_of_room: 'Main Hall', number_of_tables: 4, status: 'available', createdAt: now, updatedAt: now },
        { name_of_room: 'VIP Room', number_of_tables: 2, status: 'available', createdAt: now, updatedAt: now },
        { name_of_room: 'VIP Room', number_of_tables: 2, status: 'available', createdAt: now, updatedAt: now },
        { name_of_room: 'Garden', number_of_tables: 6, status: 'occupied', createdAt: now, updatedAt: now },
        { name_of_room: 'Garden', number_of_tables: 6, status: 'available', createdAt: now, updatedAt: now },
        { name_of_room: 'Balcony', number_of_tables: 3, status: 'occupied', createdAt: now, updatedAt: now },
        { name_of_room: 'Balcony', number_of_tables: 3, status: 'available', createdAt: now, updatedAt: now },
        { name_of_room: 'Terrace', number_of_tables: 5, status: 'available', createdAt: now, updatedAt: now },
        { name_of_room: 'Terrace', number_of_tables: 5, status: 'available', createdAt: now, updatedAt: now },
      ]);

      // ================= TIME SLOTS =================
      await queryInterface.bulkInsert('TimeSlots', [
        { time: '09:00 - 11:00', status: 'available', createdAt: now, updatedAt: now },
        { time: '11:00 - 13:00', status: 'available', createdAt: now, updatedAt: now },
        { time: '13:00 - 15:00', status: 'available', createdAt: now, updatedAt: now },
        { time: '15:00 - 17:00', status: 'available', createdAt: now, updatedAt: now },
        { time: '17:00 - 19:00', status: 'available', createdAt: now, updatedAt: now },
      ]);

      // ================= BOOKINGS =================
      await queryInterface.bulkInsert('Bookings', [
        { date: '2026-05-20', user_id: 1, seat_id: 1, timeSlotId: 1, status: 'confirmed', createdAt: now, updatedAt: now },
        { date: '2026-05-20', user_id: 2, seat_id: 2, timeSlotId: 2, status: 'confirmed', createdAt: now, updatedAt: now },
        { date: '2026-05-21', user_id: 3, seat_id: 3, timeSlotId: 1, status: 'pending', createdAt: now, updatedAt: now },
        { date: '2026-05-21', user_id: 4, seat_id: 4, timeSlotId: 2, status: 'confirmed', createdAt: now, updatedAt: now },
        { date: '2026-05-22', user_id: 5, seat_id: 5, timeSlotId: 3, status: 'cancelled', createdAt: now, updatedAt: now },
        { date: '2026-05-22', user_id: 6, seat_id: 6, timeSlotId: 1, status: 'confirmed', createdAt: now, updatedAt: now },
        { date: '2026-05-23', user_id: 7, seat_id: 7, timeSlotId: 2, status: 'confirmed', createdAt: now, updatedAt: now },
        { date: '2026-05-23', user_id: 8, seat_id: 8, timeSlotId: 3, status: 'confirmed', createdAt: now, updatedAt: now },
        { date: '2026-05-24', user_id: 9, seat_id: 9, timeSlotId: 4, status: 'pending', createdAt: now, updatedAt: now },
        { date: '2026-05-24', user_id: 10, seat_id: 10, timeSlotId: 5, status: 'confirmed', createdAt: now, updatedAt: now },
      ]);

      // ================= ORDERS =================
      await queryInterface.bulkInsert('Orders', [
        { order_name: 'Latte Order', order_date: now, total_cost: 4.5, booking_id: 1, status: 'pending', createdAt: now, updatedAt: now },
        { order_name: 'Espresso Order', order_date: now, total_cost: 3.0, booking_id: 2, status: 'pending', createdAt: now, updatedAt: now },
        { order_name: 'Cappuccino Order', order_date: now, total_cost: 4.0, booking_id: 3, status: 'completed', createdAt: now, updatedAt: now },
        { order_name: 'Sandwich Order', order_date: now, total_cost: 6.5, booking_id: 4, status: 'completed', createdAt: now, updatedAt: now },
        { order_name: 'Mocha Order', order_date: now, total_cost: 5.0, booking_id: 5, status: 'pending', createdAt: now, updatedAt: now },
        { order_name: 'Croissant Order', order_date: now, total_cost: 3.5, booking_id: 6, status: 'pending', createdAt: now, updatedAt: now },
        { order_name: 'Smoothie Order', order_date: now, total_cost: 5.5, booking_id: 7, status: 'pending', createdAt: now, updatedAt: now },
        { order_name: 'Cold Brew Order', order_date: now, total_cost: 4.75, booking_id: 8, status: 'completed', createdAt: now, updatedAt: now },
        { order_name: 'Brownie Order', order_date: now, total_cost: 3.25, booking_id: 9, status: 'pending', createdAt: now, updatedAt: now },
        { order_name: 'Avocado Toast Order', order_date: now, total_cost: 6.0, booking_id: 10, status: 'completed', createdAt: now, updatedAt: now },
      ]);

      // ================= PAYMENTS =================
      await queryInterface.bulkInsert('Payments', [
        { booking_id: 1, amount: 4.5, method: 'Cash', createdAt: now, updatedAt: now },
        { booking_id: 2, amount: 3.0, method: 'Card', createdAt: now, updatedAt: now },
        { booking_id: 3, amount: 4.0, method: 'Cash', createdAt: now, updatedAt: now },
        { booking_id: 4, amount: 6.5, method: 'Card', createdAt: now, updatedAt: now },
        { booking_id: 5, amount: 5.0, method: 'Cash', createdAt: now, updatedAt: now },
        { booking_id: 6, amount: 3.5, method: 'Card', createdAt: now, updatedAt: now },
        { booking_id: 7, amount: 5.5, method: 'Cash', createdAt: now, updatedAt: now },
        { booking_id: 8, amount: 4.75, method: 'Card', createdAt: now, updatedAt: now },
        { booking_id: 9, amount: 3.25, method: 'Cash', createdAt: now, updatedAt: now },
        { booking_id: 10, amount: 6.0, method: 'Card', createdAt: now, updatedAt: now },
      ]);

      console.log('🎉 Seeder completed successfully');

    } catch (err) {
      console.error('❌ Seeder failed:', err.message);
      throw err;
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Payments', null, {});
    await queryInterface.bulkDelete('Orders', null, {});
    await queryInterface.bulkDelete('Bookings', null, {});
    await queryInterface.bulkDelete('TimeSlots', null, {});
    await queryInterface.bulkDelete('Seats', null, {});
    await queryInterface.bulkDelete('Menus', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};