const { DB_NAME, USER_NAME, PASSWORD } = require("dotenv").config().parsed;
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
