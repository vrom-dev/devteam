const { Schema, model } = require('mongoose')

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

module.exports = Task