'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Phones', {
      fields: ['model', 'brand', 'manufacturedYear', 'RAMsize'],
      type: 'unique',
      name: 'Phone_unique_spec'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Phones', 'Phone_unique_spec');
  }
};
