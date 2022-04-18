const connection = require("../database");


const getAuthors = (request,response)=>{
    const sql = `SELECT * FROM author`;

    connection.query(sql,(err,res)=>{
        if(err){
            response.send({error:true, data: []})
        }
        else{
            response.send({error: false, data: res});
        }
    })
}


const getAuthor = (request,response)=>{
    const {id} = request.params;
    const params = [id];
    const sql = `SELECT * FROM author WHERE id_author= ?`;

    connection.query(sql,params,(err,res)=>{
        if(err){
            response.send({error:true})
        }
        else if(res.length >0){
            response.send({error: false, found:true, data: res});
        }
        else{
            response.send({error: false, found:false, data: res});
        }
    })
}

const postAuthor = (request,response)=>{
    const {first_name, last_name} = request.body;
    const params = [first_name, last_name];
    const sql = `INSERT INTO author (first_name, last_name) VALUES (?,?)`

    connection.query(sql, params,(err,res)=>{
        if(err){
            response.send({error: true, created: null});
        }
        else{
            response.send({error: false, created: res.insertId});
        }
    })
}

const putAuthor = (request, response)=>{
    const id = request.params.id;
    const {first_name, last_name}= request.body;
    const params = [first_name, last_name,id]
    let sql = `UPDATE author SET first_name = COALESCE(?, first_name), last_name = COALESCE(?, last_name) WHERE id_author=?`

    connection.query(sql, params,(err,res)=>{
        if(err){
            response.send({error: true, update: false});
        }
        else if(res.affectedRows >0){
            response.send({error: false, updated:true});
        }
        else{
            response.send({error: false, updated:false});
        }
    })
}





module.exports = {getAuthors, getAuthor, postAuthor, putAuthor}