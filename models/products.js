"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const HIDDEN_ATTRIBUTES = [ 'createdAt', 'updatedAt' ];
  class Products extends Model {
    
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
  };
  Products.init({
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};