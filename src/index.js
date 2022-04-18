require('dotenv').config();
require("./database");
const app = require("./app");


app.listen(app.get("port"), ()=>{
    console.log("Server listen on port:", app.get("port"))
});