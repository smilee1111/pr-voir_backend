const {Datatypes}=require('sequelize');
const sequelize = require('../self_planner_website_backend/database/db');

const Test = sequelize.define('Test',{
    id:{
        type: Datatypes.INTEGER,
        primarykey:true,
        autoIncrement: true,
    },
    username:{
        type: Datatypes.STRNG,
        unique:true,
        allowNull:false,
    },
    password:{
        type:Datatypes.STRING,
        allowNull:false
    }
})
module.exports =Test;