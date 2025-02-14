// const { DataTypes } = require('sequelize');
// const sequelize = require('../database/db'); // Path to your Sequelize instance

// const User = sequelize.define('User', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     phonenumber: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
// });

// module.exports = User;
const { DataTypes } = require("sequelize");
const sequelize = require("../database/db"); // Ensure correct path

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  phonenumber: { type: DataTypes.BIGINT, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: true });
module.exports = User;



