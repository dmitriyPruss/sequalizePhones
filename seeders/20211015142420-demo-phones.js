'use strict';

const phonesData = require('../phones.json');
const phones = phonesData.map(phone => ({
  ...phone,
  createdAt: new Date(),
  updatedAt: new Date()
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Phones', phones, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Phones', null, {});
  }
};
