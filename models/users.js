/* const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');
const uuid = require('uuid');

class user extends Model {}
user.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    guid: {
      allowNull: false,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: uuid.v4(),
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    admin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,  
    }
}, {
  tableName: "users",
  sequelize,
});

module.exports =  user; */