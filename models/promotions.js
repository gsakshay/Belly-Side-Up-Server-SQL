const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');
const uuid = require('uuid');

class promotion extends Model {}
promotion.init({
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
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    price: {
      type: DataTypes.FLOAT, 
      allowNull: false,
      validate:{
        min: 0,
      }
    },  
    description: {
      type: DataTypes.STRING(1234),
      required: true,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
}, {
  tableName: "promotions",
  sequelize,
});

promotion.sync().then(()=>console.log("Table is created/updated"))

module.exports =  promotion;