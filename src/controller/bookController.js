const connection = require("../database");
const Book = require("../models/book")
const Author = require("../models/author")


const getBooks = (request,response)=>{
    let books = [];
    const sql = `SELECT id_book, name, isbn, id_author, first_name, last_name FROM book INNER JOIN author ON (author.id_author = book.author)`;

    connection.query(sql,(err,res)=>{
        if(err){
            console.log(err)
            response.send({error:true, data: []})
        }
        else{
            books = bookModel(res)
            response.send({error: false, data: books});
        }
    })
}


const getBook = (request,response)=>{
    const {id} = request.params;
    const params = [id];
    const sql = `SELECT id_book, name, isbn, id_author, first_name, last_name FROM book INNER JOIN author ON (author.id_author = book.author) WHERE id_book=?`;
    let books = [];

    connection.query(sql,params,(err,res)=>{
        if(err){
            response.send({error:true})
        }
        else if(res.length >0){
            books = bookModel(res)
            response.send({error: false, found:true, data: books});
        }
        else{
            response.send({error: false, found:false, data: res});
        }
    })
}


const postBook = (request,response)=>{
    const {author, name, isbn} = request.body;
    const params = [author, name, isbn];
    const sql = `INSERT INTO book (author, name, isbn) VALUES (?,?,?)`

    connection.query(sql, params,(err,res)=>{
        if(err){
            response.send({error: true, created: null});
        }
        else{
            response.send({error: false, created: res.insertId});
        }
    })
}


const putBook = (request, response)=>{
    const id = request.params.id;

    for(let property in request.body){
        if(request.body[property]===''){
            request.body[property]=null
        }
    }

    const {name, isbn}= request.body;
    const params = [name, isbn,id]
    let sql = `UPDATE book SET name = COALESCE(?, name), isbn = COALESCE(?, isbn) WHERE id_book=?`

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

function bookModel(res){
    let books = [];
    let author;
    let book;

    books = res.map((value)=>{
        author = new Author(value.id_author, value.first_name, value.last_name);
        book = new Book(value.id_book, value.name, value.isbn, author);
        return book
    })

    return books
}


module.exports = {getBooks, getBook, postBook , putBook}
