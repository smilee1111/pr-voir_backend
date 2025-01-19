const express = require("express");
const cors= require("cors");
const bodyParser = require("body-parser");
const sequelize=require('./database/db')
const userRoute=require('./routes/userRoutes')

//creating a server
const app=express();


//creating a port
const PORT=5001;

//creating a middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//creating a routeS
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