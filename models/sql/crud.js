const Sequelize = require('sequelize')

const { user, password } = process.env
const sequelize = new Sequelize('todo', user, password, {
    dialect: 'mysql',
    logging: false
})
//Importing the model
const Task = require('./Task')

// CRUD functions
const create = (task)=> {
    Task.create(task).then(task=> console.log("Task's auto-generated ID:", task.id))
    sequelize.close()
}

async function findAll (){
    const tasks = await Task.findAll()
    if (tasks.length === 0){
        console.log('no tasks found')
    } else {
    tasks.forEach(task=>console.log(task.dataValues))
    sequelize.close()
    }
}

async function findOne(id){
    const task = await Task.findByPk(id)
    if (task===null) {
        console.log('task not found')
    } else {
    console.log(task.dataValues)
    sequelize.close()
    }
}

async function update(taskId, answer){
    const task = await Task.findByPk(taskId)
    if (task===null){
        console.log('task not found')
    } else {
    const newStatus = answer.status
    task.update({status: newStatus},
    {where: {id: taskId}}
    )
    console.log('task updated')
    }
}

async function deleteOne(taskId){
    const task = await Task.findByPk(taskId)
    if (task===null){
        console.log('task not found')
    } else {
        task.destroy()
        console.log('task deleted')
    }
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteOne
}
