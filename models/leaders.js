const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');
const uuid = require('uuid');

class leader extends Model {}
leader.init({
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
    designation: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    abbr: {
      type: DataTypes.STRING,
      required: true,
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
  tableName: "leaders",
  sequelize,
});

leader.sync({alter: true}).then(()=>console.log("Table is created/updated"))

module.exports =  leader;