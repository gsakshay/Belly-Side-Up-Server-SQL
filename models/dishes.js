const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');
const comment = require("./comments")
const favorite = require("./favorite");
const order = require('./orders');

class dish extends Model {}
dish.init({
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,   
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
  sourceKey: "id",
  foreignKey: 'dishId'
});
comment.belongsTo(dish, {
  sourceKey: "id",
  foreignKey: 'dishId'
});

dish.hasMany(order, {
  sourceKey: "id",
  foreignKey: 'dishId'
});
order.belongsTo(dish, {
  sourceKey: "id",
  foreignKey: 'dishId'
});

dish.sync().then(()=>console.log("Table is created/updated"))

module.exports =  dish;