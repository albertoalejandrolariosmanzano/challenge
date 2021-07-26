"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Users",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
        },
        key: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        secret: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        device_id: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true,
        },
        rol_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        active: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        code: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
