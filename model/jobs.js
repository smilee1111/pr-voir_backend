const {Datatypes}=require('sequelize');
const sequelize = require('../self_planner_website_backend/database/db');

const jobs = sequelize.define('jobs',{
    job_id:{
        type: Datatypes.INTEGER,
        primarykey:true,
        autoIncrement: true,
    },
    job_name:{
        type: Datatypes.STRNG,
        unique:true,
        allowNull:false,
    },
    job_salary:{
        type:Datatypes.INTEGER,
        allowNull:false
    }
})
module.exports=jobs;