const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const getCurrentTime = require("./get-current-time");
const Task = require("./data/models/task");
const { writeFileSync } = require("fs");

async function init(){
    writeFileSync(path.join(__dirname, "./data/json-db.json"), "[]");
    console.log(`Database connection established`);
}

async function create(user, description, status = "pending") {
    try {
        const { pretty: date } = await getCurrentTime();
        const task = new Task(user, description, status, date);
        const db = await findAll();
        db.push(task);
        await writeFile(path.join(__dirname, "./data/json-db.json"), JSON.stringify(db));
        return task
    } catch (err) {
        console.log(err.message);
    }       
}


async function findAll(){
    const db = await readFile(path.join(__dirname, "./data/json-db.json"));
    return JSON.parse(db);
}

async function findOne(id){
    const db = await findAll();
   const user = db.find(e => e.id === id);
   return user
}
let miId = "255320ea-58d4-4337-9017-3e9f408cca55"
// init()
create("Mary", "Bishop");
findOne(miId);