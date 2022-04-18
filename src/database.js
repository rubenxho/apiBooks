const mysql = require("mysql2");

const connectionData = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_BBDD
}

let connection = mysql.createConnection(connectionData);

connection.connect(function (err, res) {
    if(err) console.log(err);
    else console.log("MySQL Database connected!" );
});

module.exports = connection;