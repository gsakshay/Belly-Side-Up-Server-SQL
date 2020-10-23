/* const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');

class users extends Model {}
exports.users = users;
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
      unique: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull
    },
    admin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,  
    }
}, {
  tableName: "users",
  sequelize,
});

user.sync().then(() => {
  console.log('table created');
}); */