const { connect, connection } = require('mongoose')
const Task = require('task')

const mongoUrl = 'mongodb://localhost:27017/devteam'

const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

const create = async (taskObject) => {
  try {
    await connect(mongoUrl, config)
    const task = new Task(taskObject)
    await task.save()
    connection.close()
    return task.toJSON()
  } catch (e) {
    connection.close()
    return e._message
  }
}

const findAll = async () => {
  try {
    await connect(mongoUrl, config)
    const tasks = await Task.find({})
    connection.close()
    return tasks.map(task => task.toJSON())
  } catch (e) {
    connection.close()
    return e._message
  }
}

const findOne = async (id) => {
  try {
    await connect(mongoUrl, config)
    const task = await Task.findById(id)
    connection.close()
    return task.toJSON()
  } catch (e) {
    connection.close()
    return e._message
  }
}

const update = async (id, newStatus) => {
  try {
    await connect(mongoUrl, config)
    const task = await Task.findByIdAndUpdate(id, { status: newStatus }, { new: true })
    connection.close()
    return task.toJSON()
  } catch (e) {
    connection.close()
    return e._message
  }
}

const deleteOne = async (id) => {
  try {
    await connect(mongoUrl, config)
    await Task.findByIdAndDelete(id)
    connection.close()
    return true
  } catch (e) {
    connection.close()
    return e._message
  }
}

module.exports = { create, findAll, findOne, update, deleteOne }