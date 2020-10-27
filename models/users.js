const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');
const comment = require("./comments");
const favorite = require('./favorite');

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
      unique: true
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

user.hasMany(comment, {
  sourceKey: "guid",
  foreignKey: 'userId'
});
comment.belongsTo(user);

user.hasMany(favorite, {
  sourceKey: "guid",
  foreignKey: 'userId'
});
favorite.belongsTo(user)

user.sync().then(()=>console.log("Table is created/updated"))

module.exports =  user;