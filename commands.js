#!/usr/bin/env node
const program = require('commander')

require('dotenv').config()
const { BBDD } = process.env
const { create, findOne, findAll, update, deleteOne } = require('./init')[BBDD]

const inquirer = require('inquirer')
inquirer.registerPrompt("date", require("inquirer-date-prompt"))

const Choices = require('inquirer/lib/objects/choices');


program
    .version('1.0.0')
    .description('client management system')

// create OK
program
    .command('create')
    .alias('c')
    .description('add todo task')
    .action(() => {
        const createQuestions = [
            {
              type: 'input',
              name: 'user',
              message: 'User:'
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

        create({...prompt1, ...prompt2})
    })

//update OK
program
    .command('update <id>')
    .alias('u')
    .description('update task')
    .action(() => {
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
    .command('find <id>')    
    .alias('f')
    .description('find task')
    .action(id => {
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
      findOne(answer);
    })
      

//find all OK
program
    .command('list')    
    .alias('l')
    .description('list all task')
    .action(() => findAll())


//delete one OK
program
    .command('delete <id>')    
    .alias('r')
    .description('remove task')
    .action(() => {
        const taskArray = await findAll()
        const question = [
          {
          type: 'list',
          name: 'id',
          message: 'Choose task to update:',
          choices: taskArray.map(task => {
            return {name: task.description, value: task.id}
          })
          }
        ]
        const answer = await inquirer.prompt(question)
        deleteOne(answer)
    })

program.parse(process.argv);