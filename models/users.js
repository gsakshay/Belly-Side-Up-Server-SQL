const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');
const comment = require("./comments");
const favorite = require('./favorite');
const feedback = require('./feedback');
const order = require('./orders');

class user extends Model {}
user.init({
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
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
  sourceKey: "id",
  foreignKey: 'userId'
});
comment.belongsTo(user, {
  sourceKey: "id",
  foreignKey: 'userId'
});

user.hasMany(favorite, {
  sourceKey: "id",
  foreignKey: 'userId'
});
favorite.belongsTo(user ,{
  sourceKey: "id",
  foreignKey: 'userId'
})

user.hasMany(order, {
  sourceKey: "id",
  foreignKey: 'userId'
});
order.belongsTo(user, {
  sourceKey: "id",
  foreignKey: 'userId'
})

user.hasMany(feedback, {
  sourceKey: "id",
  foreignKey: 'userId'
});
feedback.belongsTo(user, {
  sourceKey: "id",
  foreignKey: 'userId'
})

user.sync().then(()=>console.log("Table is created/updated"))

module.exports =  user;