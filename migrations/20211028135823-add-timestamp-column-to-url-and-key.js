'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      
      await queryInterface.addColumn('URL', 'createdAt', 
        {
          type: Sequelize.DATE,
          required: true,
          default: Sequelize.NOW
        }, { transaction });
      await queryInterface.addColumn('URL', 'ttl', 
        {
          type: Sequelize.DATE,
          required: true,
        }, { transaction });
      await queryInterface.addColumn('KEY', 'createdAt', 
        {
          type: Sequelize.DATE,
          required: true,
          default: Sequelize.NOW,
        }, { transaction });
      await transaction.commit()
    } catch(err) {
      await transaction.rollback();
      throw err;
    }
     
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('URL', 'createdAt', { transaction });
      await queryInterface.removeColumn('URL', 'ttl', { transaction });
      await queryInterface.removeColumn('KRY', 'createdAt', { transaction });
      await transaction.commit();
    } catch(err) {
      await transaction.rollback();
      throw err;
    }
  }
};
