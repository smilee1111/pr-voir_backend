//Impoerting the model 
const Test = require('../model/Test')


//Create functions to get all Test Users
const getTest = async(req,res)=>{
    try{
        const tests = await Test.findAll()
        res.status(200).json(tests);
        console.log('Retreive all test users');

    }
    catch(error){
        res.status(500).json({error: 'Faailed to retrieve test data'});

    }
}

//create functions to create Test users
const createTest =async(req,res)=>{
    try{
        const{username,password} =req.body;
        const newtest = await Test.create({username,password});
        res.status(200).json(newtest);
        console.log('New Test user Created')
    }
    catch(error){
        res.status(500).json({error:'failed to create test user '});
    }
}
module.exports={getTest,createTest}