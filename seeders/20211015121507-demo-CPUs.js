'use strict';

const cpusData = require('./../initialDBdata/cpus.json');
const cpus = cpusData.map(cpu => ({
  ...cpu,
  createdAt: new Date(),
  updatedAt: new Date()
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CPUs', cpus, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CPUs', null, {});
  }
};
