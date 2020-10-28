const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');

class order extends Model {}
order.init({
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    dishId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    isDelivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
}, {
  tableName: "orders",
  sequelize,
});

order.sync().then(()=>console.log("Table is created/updated"))

module.exports =  order;