const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const User = require("../model/user");
//event model detail
//event model in db looks like
const Event = sequelize.define("events", {
   eventid: {
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
   startdatetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  enddatetime: {
      type: DataTypes.DATE,
      allowNull: false,
  },
   location: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: "id" },
    onDelete: "CASCADE"
  }
 

});
Event.belongsTo(User, { foreignKey: "userId" });
module.exports = Event;
