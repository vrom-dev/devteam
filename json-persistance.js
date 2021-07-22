const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const getCurrentTime = require("./helpers/get-current-time");
const Task = require("./data/models/task");
const { writeFileSync } = require("fs");

function init() {
  writeFileSync(path.join(__dirname, "./data/json-db.json"), "[]");
  console.log(`Database connection established`);
}

// Returns database as object 
async function findAll() {
  try {
    const db = await readFile(path.join(__dirname, "./data/json-db.json"));
    return JSON.parse(db);
  } catch (err) {
    console.log(err.message);
  }
}


async function create(user, description, status = "pending") {
  try {
    const task = new Task(user, description, status);
    const dbAsArray = await findAll();
    dbAsArray.push(task);
    await write(dbAsArray);
    return task;
  } catch (err) {
    console.log(err.message);
  }
}


async function findOne(id) {
  try {
    const dbAsArray = await findAll();
    const user = dbAsArray.find((e) => e.id === id);
    return user;
  } catch (err) {
    console.log(err.message);
  }
}

async function update(id, status) {
  try {
    const dbAsArray = await findAll();
    const userPosition = dbAsArray.findIndex((user) => user.id === id);
    dbAsArray[userPosition].status = status;
    dbAsArray[userPosition].endedAt = getCurrentTime();
    await write(dbAsArray);
  } catch (err) {
    console.log(err.message);
  }
}

async function deleteOne(id) {
  try {
    const dbAsArray = await findAll();
    const userPosition = dbAsArray.findIndex((user) => user.id === id);
    dbAsArray.splice(userPosition, 1);
    await write(dbAsArray);
  } catch (err) {
    console.log(err.message);
  }
}

async function write(db) {
  await writeFile(
    path.join(__dirname, "./data/json-db.json"),
    JSON.stringify(db)
  );
}

module.exports = { init, create, findOne, findAll, update, deleteOne };
