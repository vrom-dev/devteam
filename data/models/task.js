const { v4: uuidv4} = require("uuid");

class Task {
    constructor(user, description, status, createAt, endedAt = null){
        this.id = uuidv4();
        this.user = user;
        this.description = description;
        this.status = status;
        this.createAt = createAt;
        this.endedAt = endedAt;
    }
}

module.exports = Task;