//Impoerting the model 
const User = require('../model/user')


//Create functions to get all Test Users
const getUser = async(req,res)=>{
    try{
        const users = await User.findAll()
        res.status(200).json(users);
        console.log('Retreive all test users');

    }
    catch(error){
        res.status(500).json({error: 'Faailed to retrieve test data'});

    }
}

//create functions to create Test users
const createUser =async(req,res)=>{
    try{
        const{username,password} =req.body;
        const newuser = await Test.create({username,password});
        res.status(200).json(newuser);
        console.log('New Test user Created')
    }
    catch(error){
        res.status(500).json({error:'failed to create user '});
    }
}
module.exports={getUser,createUser}