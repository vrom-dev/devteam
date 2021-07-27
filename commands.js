#!/usr/bin/env node
const program = require('commander')

require('dotenv').config()
const { BBDD } = process.env
const { create, findOne, findAll, update, deleteOne } = require('./init')[BBDD]

const inquirer = require('inquirer')
inquirer.registerPrompt("date", require("inquirer-date-prompt"))

program
    .version('1.0.0')
    .description('client management system')

// create OK
program
    .command('create')
    .alias('c')
    .description('add todo task')
    .action(async () => {
        const createQuestions = [
            {
              type: 'input',
              name: 'user',
              message: 'User:'
            },
            {
              type: 'input',
              name: 'description',
              message: 'Task description:'
            },
            {
              type: 'list',
              name: 'status',
              message: 'Status:',
              choices: ['completed', 'pending', 'executing']
            },
            {
              type: 'date',
              name: 'createdAt',
              message: 'Created:'
            }
        ]
        
        const completedQuestion = {
            type: 'date',
            name: 'endedAt',
            message: 'Ended at:'
        }
        
        const prompt1 = await inquirer.prompt(createQuestions)

        if (prompt1.status === 'completed') {
          var prompt2 = await inquirer.prompt(completedQuestion)
        }

        const task = {...prompt1, ...prompt2}

        await create(task)
        console.log(task)
        console.log('Task created!')
    })

//update OK
program
    .command('update')
    .alias('u')
    .description('update task')
    .action(async () => {
        const taskArray = await findAll()
        const questions = [
          {
          type: 'list',
          name: 'id',
          message: 'Choose task to update:',
          choices: taskArray.map(task => {
            return {name: task.description, value: task.id}
          })
          },
          {
            type: 'list',
            name: 'status',
            message: 'New status:',
            choices: ['completed', 'pending', 'executing']
          }
        ]
        const answers = await inquirer.prompt(questions)
        update(answers)
    })    

//find one OK
program
    .command('find')    
    .alias('f')
    .description('find task')
    .action( async () => {
        const taskArray = await findAll()
        const question = [
      {
      type: 'list',
      name: 'id',
      message: 'Choose task to find:',
      choices: taskArray.map(task => {
        return {name: task.description, value: task.id}
      })
      }];
      const answer = await inquirer.prompt(question);
      const task = await findOne(answer)
      console.log(task)
    })
      

//find all OK
program
    .command('list')    
    .alias('l')
    .description('list all task')
    .action(async () => {
      const tasks = await findAll()
      tasks.forEach(task => console.log(task))
    })


//delete one OK
program
    .command('delete')    
    .alias('r')
    .description('remove task')
    .action(async () => {
        const taskArray = await findAll()
        const question = [
          {
          type: 'list',
          name: 'id',
          message: 'Choose task to delete:',
          choices: taskArray.map(task => {
            return {name: task.description, value: task.id}
          })
          }
        ]
        const answer = await inquirer.prompt(question)
        await deleteOne(answer)
        console.log('Task deleted!')
    })

program.parse(process.argv);