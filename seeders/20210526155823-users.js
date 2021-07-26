"use strict";
const { generatePassword, generateUUID } = require("../helpers/index");

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
        await sequelize.query("TRUNCATE TABLE Users", options);
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", options);
      });
    } catch (error) {
      console.log(error);
    }
    const users = [{
        id: await generateUUID(),
        key: 'admin',
        secret: await generatePassword("admin"),
        rol_id: 1,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: await generateUUID(),
        key: 'alexpgr.x4@gmail.com',
        secret: await generatePassword( "1234567890" ),
        rol_id: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    for (let x of users) {
      await queryInterface.bulkInsert("Users", [{
        id: x.id,
        key: x.key,
        secret: x.secret,
        rol_id: x.rol_id,
        active: x.active,
        createdAt: x.createdAt,
        updatedAt: x.updatedAt,
      },]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("Users", null, {});
  },
};
