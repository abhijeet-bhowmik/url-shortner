'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('KEY', {
        id: {
          type: Sequelize.INTEGER,
          autoIncreement: true,
          primaryKey: true,
        },
        value: {
          type: Sequelize.STRING(7),
          required: true,
          unique: true,
        },
        assigned: {
          type: Sequelize.BOOLEAN,
          default: 0,
        }
      }, { transaction });
      await queryInterface.addIndex('KEY', ['value', 'assigned'], { transaction });
      await transaction.commit();
    } catch(err) {
      await transaction.rollback();
      throw err;
    }
     
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('KEY');
  }
};
