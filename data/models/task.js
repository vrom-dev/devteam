const { v4: uuidv4} = require("uuid");
const getCurrentTime = require("../../helpers/get-current-time");
class Task {
    constructor(user, description, status, createAt, endedAt = null){
        this.id = uuidv4();
        this.user = user;
        this.description = description;
        this.status = status;
        this.createAt = getCurrentTime();
        this.endedAt = endedAt;
    }
}

module.exports = Task;