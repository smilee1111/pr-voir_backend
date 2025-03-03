const { Sequelize } = require("sequelize");
//database connection
const sequelize = new Sequelize('personal_planner_db', 'postgres', 'musk@n2020#',{

    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
});

//testing connection
async function testConnection() {
    try{
        await sequelize.authenticate();
        console.log('DB connection successful............................')
    }
    catch(error){
        console.error('Unable to connect to the database...............', error)

}    
}
testConnection()

module.exports = sequelize;