"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
     const { sequelize } = queryInterface;
     try {
      await sequelize.transaction(async (transaction) => {
        const options = { transaction };
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", options);
        await sequelize.query("TRUNCATE TABLE Rols", options);
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", options);
      });
    } catch (error) {
      console.log(error);
    }
    const rolsAvailable = ["Administrator", "Support", "Client"];
    for (let x in rolsAvailable) {
      await queryInterface.bulkInsert("Rols", [
        {
          name: rolsAvailable[x],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Rols", null, {});
  },
};
