const connection = require("../database");

const postLogin = (request,response)=>{

    const {email, password} = request.body;
    const params = [email, password];
    const sql = `SELECT id_user, first_name, last_name, email FROM user WHERE email=? AND password=?`;

    connection.query(sql,params,(err,res)=>{
        if(err){
            response.send({error:true, data: []})
        }
        else if(res.length > 0){
            response.send({error: false, found:true, data: res});
        }
        else{
            response.send({error: false, found:false, data: res});
        }
    })
}

const postRegister = (request,response)=>{
    const {first_name, last_name, email, password} = request.body;
    const params = [first_name, last_name, email, password];
    const sql = `INSERT INTO user (first_name, last_name, email, password) VALUES (?,?,?,?)`

    connection.query(sql, params,(err,res)=>{
        if(err){
            response.send({error: true, created: null});
        }
        else{
            response.send({error: false, created: res.insertId});
        }
    })
}

module.exports = {postLogin,postRegister}