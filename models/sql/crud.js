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
        const taskArray = []
        tasks.forEach(task=>console.log(task.dataValues))
        tasks.forEach(task=>taskArray.push(task.dataValues))
        sequelize.close()
        return taskArray
    }
}

async function findOne(taskObj){
    try {
    const task = await Task.findByPk(taskObj.id)
    if (task===null) {
        console.log('task not found')
    } else {
        const taskArray = []
        taskArray.push(task.dataValues)
        return taskArray 
    }
    } catch(err){console.log(err)}
}

async function update(taskObj){
    const task = await Task.findByPk(taskObj.id)
    if (task===null){
        console.log('task not found')
    } else {
    const newStatus = taskObj.status
    task.update({status: newStatus},
    {where: {id: taskObj.id}}
    )
    console.log('task updated')
    }
}

async function deleteOne(taskObj){
    const task = await Task.findByPk(taskObj.id)
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
