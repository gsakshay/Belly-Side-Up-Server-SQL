const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');
const uuid = require('uuid');
const passportLocalSequelize = require('passport-local-sequelize');

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
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    admin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,  
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    hash: {
      type: DataTypes.STRING
    },
}, {
  tableName: "users",
  sequelize,
});

user.sync().then(()=>console.log("Table is created/updated"))

module.exports =  user;