const { Sequelize } = require("sequelize");

Sequelize

const sequelize = new Sequelize('plan','postgres','musk@n2020#',{
    host:'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
});

async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log('DB Connection successful............')
    }
    catch(error){
        console.error('Unable to connet..........',error)
    }
}
testConnection()

module.exports=sequelize;