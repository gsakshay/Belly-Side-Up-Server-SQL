const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');
const comment = require("./comments")
const favorite = require("./favorite")

class dish extends Model {}
dish.init({
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
    category: {
      type: DataTypes.STRING,
      required: true,
    },
    description: {
      type: DataTypes.STRING(1234),
      required: true,
    },
    price: {
      type: DataTypes.FLOAT, 
      allowNull: false,
      validate:{
        min: 0,
      }
    },
    featured: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
}, {
  tableName: "dishes",
  sequelize,
});

dish.hasMany(comment, {
  sourceKey: "guid",
  foreignKey: 'dishId'
});
comment.belongsTo(dish);

dish.hasOne(favorite, {
  sourceKey: "guid",
  foreignKey: 'dishId'
});
favorite.belongsTo(dish)

dish.sync().then(()=>console.log("Table is created/updated"))

module.exports =  dish;