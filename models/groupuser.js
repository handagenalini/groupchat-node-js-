const Sequelize = require('sequelize');

const sequelize = require('../utills/database');

const Groupuser = sequelize.define('groupuser', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  isadmin:{
    type: Sequelize.BOOLEAN,
    defaultValue: false}
});

module.exports = Groupuser;