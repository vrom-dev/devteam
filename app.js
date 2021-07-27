
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('demo', 'root', '1234', {
    dialect: 'mysql'
})
const queryInterface = sequelize.getQueryInterface();
const mysql2 = require('mysql2');



var con = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "1234"
});


//creating database and table
con.connect(function(err) {
  if (err) throw err;
  //console.log("Connected!");
  con.query("CREATE DATABASE demo", function (err, result) {
    if (err) throw err;
    sequelize.sync({
      // force: true,
       logging: console.log
    })
   .then(queryInterface.createTable('Tasks', {
             id: {
               allowNull: false,
               autoIncrement: true,
               primaryKey: true,
               type: DataTypes.INTEGER
             },
             user: {
               type: DataTypes.STRING,
               isAlphanumeric: true,
               allowNull: false,
               required: true,
             },
             description: {
               type: DataTypes.TEXT,
               required: true,
               allowNull: false,
             },
             status: {
               type: DataTypes.STRING,
               allowNull: false,
               required: true
             },
             endedAt: {
               type: DataTypes.DATE
             },
             createdAt: {
               allowNull: false,
               type: DataTypes.DATE
             },
             updatedAt: {
               allowNull: false,
               type: DataTypes.DATE
             }
            })
         
   ).catch(function (error){
       console.log(error)
   })
    console.log("Database created");
    con.end()
  });
});


