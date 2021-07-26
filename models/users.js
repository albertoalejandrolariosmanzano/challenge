"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {

  const HIDDEN_ATTRIBUTES = [ 'key', 'secret', 'code', 'createdAt', 'updatedAt' ];
  
  class Users extends Model {
    toJSON(){
      // hide protected fields
      let attributes = Object.assign( {}, this.get() );
      for( let a of HIDDEN_ATTRIBUTES )
        delete attributes[ a ]
      return attributes
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.belongsTo(models.Rols, {
        as: "rols",
        foreignKey: "rol_id",
      })
      // define association here
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      key: DataTypes.STRING,
      secret: DataTypes.STRING,
      device_id: DataTypes.STRING,
      rol_id: DataTypes.INTEGER,
      code: DataTypes.TEXT,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );

  return Users;
};
