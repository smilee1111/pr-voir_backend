const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const User = require("../model/user");
const Task = sequelize.define("dailytasks", {
   taskid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
   },
   title: {
    type: DataTypes.STRING,
    allowNull: false,
   },
   description: {
    type: DataTypes.STRING,
    allowNull: false,
   },
   duetime: {
    type: DataTypes.TIME,
    allowNull: false,

  },
   status: {
    type: DataTypes.ENUM("to-do","doing","done"),
    defaultValue:"to-do",
    allowNull: false,

  },
   priority: {
    type: DataTypes.ENUM("High","Medium","Low"),
    allowNull: false,

  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: "id" },
    onDelete: "CASCADE"
  }
 

});
Task.belongsTo(User, { foreignKey: "userId" });

module.exports = Task;
