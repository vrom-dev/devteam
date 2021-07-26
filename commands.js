#!/usr/bin/env node

const program = require('commander')
const { prompt } = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
const {
    create,
    update,
    findOne,
    findAll,
    deleteOne
} = require('./models/sql/crud');


const questions = [
    {
        type: 'input',
        name: 'user', 
        message: 'User name'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Description'
    },
    {
        type: 'input',
        name: 'status',
        message: 'Status'
    },
   
]


const updatingQuestion = [
    {
        type: 'input',
        name: 'status',
        message: 'New status'
    }
]

program
    .version('1.0.0')
    .description('client management system')

// create OK
program
    .command('create')
    .alias('c')
    .description('add todo task')
    .action(()=>{
        prompt(questions).then(answers => create(answers))
    })

//update OK
program
    .command('update <id>')
    .alias('u')
    .description('update task')
    .action(id=>{
        prompt(updatingQuestion).then(answer => update(id, answer))
    })    

//find one OK
program
    .command('find <id>')    
    .alias('f')
    .description('find task')
    .action(id => findOne(id))

//find all OK
program
    .command('list')    
    .alias('l')
    .description('list all task')
    .action(() => findAll())


//delete one
program
    .command('delete <id>')    
    .alias('r')
    .description('remove task')
    .action(id => deleteOne(id))



program.parse(process.argv);