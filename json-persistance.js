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
