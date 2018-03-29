const DBModel = require("./models/db-model");
const dbModel = new DBModel();

dbModel.syncAllTables(true)
    .then(val=>{
        console.log(val)
    })
    .catch(err=>{
        console.error(err)
    })