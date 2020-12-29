const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');

class logs extends Model {}
logs.init({
    log: {
      type: DataTypes.STRING(1234),
      required: true,
    }
},{
  tableName: "logs",
  timestamps: false,
  sequelize,
});

logs.sync().then(()=>console.log("Table is created/updated"))

module.exports =  logs;