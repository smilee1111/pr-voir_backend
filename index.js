const express = require("express");
const cors= require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
const userRoute =require(',/routes/userRoute')

//creating a server
const app=express();


//creating a port
const PORT=5000;

//creating a middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const sequelize =require('./self_planner_website_backend/database/db')

//creating a route
app.get('/',(req, res)=>{
    res.send("This is web page")
})
app.get('/ourpartners',(req, res)=>{
    res.send(`Your Partners ${req.params.id}`)
})


//running on port   
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});