'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Banner.init({
    tokenid: DataTypes.STRING,  // project id
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    buttonTitle: DataTypes.STRING,
    buttonLink: DataTypes.STRING,
    endDate: DataTypes.DATE,
    deactivated: DataTypes.BOOLEAN,    
  }, {
    sequelize,
    modelName: 'Banner',
    underscored: true,
  });
  return Banner;
};