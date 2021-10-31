'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('CPUs', {
      fields: ['name', 'num_of_cores', 'frequency'],
      type: 'unique',
      name: 'CPU_unique_spec'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('CPUs', 'CPU_unique_spec');
  }
};
