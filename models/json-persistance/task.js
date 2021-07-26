const { v4: uuidv4} = require("uuid");
const getCurrentTime = require("../../helpers/get-current-time");
const { InvalidTypeError, MustHaveValueError } = require("../../helpers/errors")

class Task {
    constructor(user, description, status, createAt, endedAt = null){
        this.id = uuidv4();
        this.user = this.validate(user);
        this.description = this.validate(description);
        this.status = this.validate(status);
        this.createAt = getCurrentTime();
        this.endedAt = endedAt;
    }

    validate(value){
      try {
          if (typeof value !== "string") throw new InvalidTypeError(typeof value, "string");
          if (value === " ") throw new MustHaveValueError();
          return value;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = Task;