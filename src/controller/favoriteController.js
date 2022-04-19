const connection = require("../database");
const Author = require("../models/author");
const Book = require("../models/book");


const getFavorites = (request,response)=>{
    let books = [];
    const id = request.params.id
    const params=[id]
    let sql = `SELECT id_favorite,favorite.id_book, name, isbn, image, author.id_author, first_name, last_name FROM favorite INNER JOIN book ON (favorite.id_book = book.id_book) INNER JOIN author ON (book.id_author = author.id_author) WHERE id_user= ?`

    connection.query(sql,params,(err,res)=>{
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

const postFavorite = (request,response)=>{
    const {id_user, id_book} = request.body
    const params=[id_user, id_book]
    let sql = `INSERT INTO favorite (id_user, id_book) VALUES (?,?)`

    connection.query(sql,params,(err,res)=>{
        if(err){
            console.log(err)
            response.send({error: true, created: null});
        }
        else{
            response.send({error: false, created: res.insertId});
        }
    })
}

const deleteFavorite = (request,response)=>{
    console.log("delete")
    console.log(request.params.id)
    const id= request.params.id
    const params=[id]
    let sql = `DELETE FROM favorite WHERE id_favorite=?`

    connection.query(sql,params,(err,res)=>{
        if(err){
            console.log(err)
            response.send({error: true, deleted: null});
        }
        else{
            response.send({error: false, deleted: true});
        }
    })
}



function bookModel(res){
    let books = [];
    let author;
    let book;

    books = res.map((value)=>{
        author = new Author(value.id_author, value.first_name, value.last_name);
        book = new Book(value.id_book, value.name, value.isbn, value.image, author);
        book.id_favorite = value.id_favorite;
        book.favorite=true;
        return book
    })

    return books
}

module.exports={getFavorites,postFavorite,deleteFavorite}