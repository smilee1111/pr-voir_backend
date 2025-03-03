const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
//defining a user model 
//users details in the user table
const Users = sequelize.define("users", {
   id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
   },
   username: {
    type: DataTypes.STRING,
    allowNull: false,
   },
   email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure the email is unique
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false,
     },
   phonenumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
});


module.exports = Users;
