const mongoTask = require('./models/mongodb')

mongoTask.create( { user: 'vic', description: 'todo mongodb model', status: 'completed' })
  .then(console.log)
  .catch(console.log)