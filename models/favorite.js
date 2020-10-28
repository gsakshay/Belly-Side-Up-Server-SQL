const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');
const dish = require('./dishes');

class favorite extends Model {}
favorite.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    dishId: {
      allowNull: false,
      type: DataTypes.UUID
    },
}, {
  tableName: "favorites",
  sequelize,
});

favorite.belongsTo(dish, {
  sourceKey: "id",
  foreignKey: 'dishId'
});

favorite.sync().then(()=>console.log("Table is created/updated"))

module.exports =  favorite;