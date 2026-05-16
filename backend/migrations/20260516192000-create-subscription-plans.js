'use strict';

const now = new Date();

const plans = [
  {
    name: 'Daily Focus Pass',
    description: 'Ideal for casual visits and quick studying.',
    price: 24,
    oldPrice: null,
    durationDays: 5,
    features: JSON.stringify([
      '5 days of access',
      'Up to 6 hours per day',
      'High-speed Wi-Fi',
      'Comfortable seating',
      '10% off drinks',
    ]),
    isBestValue: false,
    discountText: null,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'Premium Study Pass',
    description: 'For serious focus and comfort.',
    price: 45,
    oldPrice: 60,
    durationDays: 10,
    features: JSON.stringify([
      '10 days of access',
      'Unlimited daily hours',
      'Premium seat selection',
      'Free Wi-Fi and charging',
      '3 complimentary drinks',
      'Private storage space',
      '1 guest day pass',
    ]),
    isBestValue: true,
    discountText: 'Save 25%',
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'Flexible Hours Pack',
    description: 'For students with changing schedules.',
    price: 30,
    oldPrice: null,
    durationDays: 30,
    features: JSON.stringify([
      '20 hours of access',
      'Valid for 30 days',
      'Full flexibility',
      'Free Wi-Fi and charging',
      'Roll over unused hours',
    ]),
    isBestValue: false,
    discountText: null,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
];

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const tables = await queryInterface.showAllTables();
    const hasTable = tables.some((table) => table.toLowerCase() === 'subscriptionplans');

    if (!hasTable) {
      await queryInterface.createTable('SubscriptionPlans', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        oldPrice: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        durationDays: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        features: {
          type: Sequelize.JSON,
          allowNull: false,
        },
        isBestValue: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        discountText: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
    }

    const count = await queryInterface.rawSelect('SubscriptionPlans', {}, ['COUNT(*)']);
    if (Number(count) === 0) {
      await queryInterface.bulkInsert('SubscriptionPlans', plans);
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('SubscriptionPlans');
  },
};
