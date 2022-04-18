//Import Global
const express = require("express");
const app = express();
const cors = require('cors');

//Import routes
const authorRoutes = require("./routes/authorRoutes");


//Config
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Port config
app.set("port", process.env.PORT || 3000);



//Router
app.use(authorRoutes)


//Endpoint Doesnt found
app.use((request,response,next)=>{
    response.status(404).json({message: "Endpoint doesnt found"})
})


module.exports = app;