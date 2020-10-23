const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bellysideup_dev', 'postgres', '2648', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;