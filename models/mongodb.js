const { Schema, model, connect, connection } = require('mongoose')

const mongoUrl = 'mongodb://localhost:27017/devteam'

const connConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

const taskSchema = new Schema({
  user: {
    type: String,
    minlength: 3,
    required: true
  },
  description: {
    type: String,
    minlength: 3,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'executing'],
    required: true
  },
  createAt: {
    type: Date,
    default: new Date(),
    required: true
  },
  endedAt: {
    type: Date,
    required: [function() { return this.status === 'completed' }]
  }
})

taskSchema.set('toJSON', {
  transform: (doc, task) => {
    task.id = task._id
    delete task._id
    delete task.__v
  }
})

const Task = model('Task', taskSchema)

const create = async (taskObject) => {
  try {
    await connect(mongoUrl, connConfig)
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
    await connect(mongoUrl, connConfig)
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
    await connect(mongoUrl, connConfig)
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
    await connect(mongoUrl, connConfig)
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
    await connect(mongoUrl, connConfig)
    await Task.findByIdAndDelete(id)
    connection.close()
    return true
  } catch (e) {
    connection.close()
    return e._message
  }
}

module.exports = { create, findAll, findOne, update, deleteOne }