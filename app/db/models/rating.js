'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Rating.init({
    tokenid: DataTypes.STRING,  // project id
    userid: DataTypes.STRING, // user who do reaction
    action: DataTypes.STRING, // enum: up, down
  }, {
    sequelize,
    modelName: 'Rating',
    underscored: true,
  });
  return Rating;
};