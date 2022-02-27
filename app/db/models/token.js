'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Token.init({
    userid: DataTypes.STRING, // submit user
    tokenName: DataTypes.STRING,
    tokenSymbol: DataTypes.STRING,
    decimal: DataTypes.INTEGER,
    network: DataTypes.STRING,
    website: DataTypes.STRING,
    whitepaper: DataTypes.STRING,
    description: DataTypes.STRING,
    logo: DataTypes.STRING,
    email: DataTypes.STRING,
    developers: DataTypes.STRING,
    audit: DataTypes.STRING,
    telegram: DataTypes.STRING,
    twitter: DataTypes.STRING,
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    coinmarketcap: DataTypes.STRING,
    coingecko: DataTypes.STRING,
    subscription: DataTypes.STRING,
    paymentTx: DataTypes.STRING,    
    verified: DataTypes.BOOLEAN,
    featured: DataTypes.BOOLEAN, // the backend running service will update this state
    socialChannel: DataTypes.BOOLEAN,
    endDate: DataTypes.DATE,
    thumbUp: DataTypes.INTEGER,
    thumbDown: DataTypes.INTEGER,
    coingeckoApiID: DataTypes.STRING // api id for fetching data from api
  }, {
    sequelize,
    modelName: 'Token',
    underscored: true,
  });
  return Token;
};