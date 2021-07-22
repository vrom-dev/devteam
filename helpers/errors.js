class InvalidTypeError extends Error {
    constructor(wrong, correct){
    super()
        this.message = `The type ${wrong} is not accepted. Use ${correct}`;
    }
}

class MustHaveValueError extends Error {
    constructor(){
        super()
        this.message = `It must have a value.`
    }
}

module.exports = { InvalidTypeError, MustHaveValueError };