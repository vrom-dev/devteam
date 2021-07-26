const { create, findOne, findAll, update, deleteOne } = require("./json-persistance");

async function init (){
    await create( " ", "Do Leste");
}

init();