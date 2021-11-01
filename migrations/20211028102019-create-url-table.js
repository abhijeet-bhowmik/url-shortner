'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('URL', {
        id: {
          type: Sequelize.INTEGER,
          autoIncreement: true,
          primaryKey: true,
        },
        actualUrl: {
          type: Sequelize.STRING(1024),
          required: true,
        },
        shortUrl: {
          type: Sequelize.STRING(7)
        }
      }, { transaction });
      await queryInterface.addIndex('URL', ['shortUrl'], { transaction });
      await transaction.commit();
    } catch(err) {
      await transaction.rollback();
      throw err;
    }
     
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('URL');
  }
};
