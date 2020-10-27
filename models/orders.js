const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');

class order extends Model {}
User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    guid: {
      allowNull: false,
      type: DataTypes.UUID,
      unique: true
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
      unique: true,
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