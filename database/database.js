const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bellysideup', process.env.DATABASE_USER, process.env.DATABASE_PASS, {
  host: process.env.DATABASE_HOST,
  dialect: 'postgres'
});

module.exports = sequelize;