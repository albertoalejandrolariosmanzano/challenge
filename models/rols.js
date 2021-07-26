"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const HIDDEN_ATTRIBUTES = [ 'createdAt', 'updatedAt' ];
  class Rols extends Model {

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
      // define association here
    }
  }
  Rols.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rols",
    }
  );
  return Rols;
};
