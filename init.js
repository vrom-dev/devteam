const mongodb = require("./models/mongodb/crud");
const json = require("./models/json-persistance/crud");
const sql = require("./models/sql/crud");

module.exports = { mongodb, json, sql };



