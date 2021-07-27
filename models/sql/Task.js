const Sequelize = require('sequelize')
const sequelize = new Sequelize('demo', 'root', '1234', {
    dialect: 'mysql',
    logging: false
})


const Task = sequelize.define('task', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    user:{
        type: Sequelize.STRING,
        isAlphanumeric: true,
        allowNull: false,
        required: true,
    },
    description:{
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
        validate:{
        len: [1, 100]
        }
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        validate: {
            isIn:[['pending', 'executing', 'completed']]
        }
    }   
}
)

module.exports = Task
