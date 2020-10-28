const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');

class comment extends Model {}
comment.init({
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    rating: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate:{
        min: 1,
        max: 5
      }
    },
    dishId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    comment: {
      allowNull: false,
      type: DataTypes.TEXT
    },
}, {
  tableName: "comments",
  sequelize,
});

comment.sync().then(()=>console.log("Table is created/updated"))

module.exports =  comment;