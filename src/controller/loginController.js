const connection = require("../database");

const postLogin = (request,response)=>{

    const {email, password} = request.body;
    const params = [email, password];
    const sql = `SELECT id_author, first_name, last_name, email FROM author WHERE email=? AND password=?`;

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

module.exports = {postLogin}