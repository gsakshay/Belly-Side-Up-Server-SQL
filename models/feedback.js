const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');

class feedback extends Model {}
feedback.init({
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
    feedback: {
        allowNull: false,
        type: DataTypes.TEXT
    }
}, {
  tableName: "feedbacks",
  sequelize,
});

feedback.sync().then(()=>console.log("Table is created/updated"))

module.exports =  feedback;