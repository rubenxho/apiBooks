const connection = require("../database");
const Book = require("../models/book")
const Author = require("../models/author")

// Endpoint original todos los libros
const getBooks = (request,response)=>{
    let books = [];
    const sql = `SELECT id_book, name, isbn, image, author.id_author, first_name, last_name FROM book INNER JOIN author ON (author.id_author = book.id_author)`;

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

// Endpoint modificado todos los libros para trabajar con favoritos
const getBooksFav= (request,response)=>{
    let books = [];
    let booksFav= [];
    let booksRes=[];
    const {id}= request.params;
    const params=[id];

    const sql = `SELECT id_book, name, isbn, image, favorite, author.id_author, first_name, last_name FROM book INNER JOIN author ON (author.id_author = book.id_author)`;
    const sql2 = `SELECT * FROM favorite WHERE id_user=?`

    connection.query(sql,(err,res)=>{
        if(err){
            response.send({error:true, data: []})
        }
        else if(res.length === 0){
            response.send({error: false, data: []});
        }
        else{
            books=res;
            connection.query(sql2,params,(err,res)=>{
                if(err){
                    response.send({error:true, data: []})
                }
                else{
                    booksFav=res;
                    booksRes=bookModelFav(books,booksFav)
                    response.send({error: false, data: booksRes});
                }
            })
        }
    })
}

// Endpoint original un libro
const getBook = (request,response)=>{
    const {id} = request.params;
    const params = [id];
    const sql = `SELECT id_book, name, isbn, image, author.id_author, first_name, last_name FROM book INNER JOIN author ON (author.id_author = book.id_author) WHERE id_book=?`;
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

// Endpoint modificado un libro para trabajar con favoritos
const getBookFav= (request,response)=>{
    let books = [];
    let booksFav= [];
    let booksRes=[];
    const {id_book,id_user} = request.params;
    const params=[id_book];
    const params2=[id_user];

    const sql = `SELECT id_book, name, isbn, image, favorite, author.id_author, first_name, last_name FROM book INNER JOIN author ON (author.id_author = book.id_author) WHERE id_book=?`;
    const sql2 = `SELECT * FROM favorite WHERE id_user=?`

    connection.query(sql,params,(err,res)=>{
        if(err){
            console.log(err)
            response.send({error:true, data: []})
        }
        else if(res.length === 0){
            response.send({error: false, data: []});
        }
        else{
            books=res;
            connection.query(sql2,params2,(err,res)=>{
                if(err){
                    console.log(err)
                    response.send({error:true, data: []})
                }
                else{
                    booksFav=res;
                    booksRes=bookModelFav(books,booksFav)
                    response.send({error: false, data: booksRes});
                }
            })
        }
    })
}


const postBook = (request,response)=>{
    const {id_author, name, isbn,image} = request.body;
    const params = [id_author, name, isbn, image];
    const sql = `INSERT INTO book (id_author, name, isbn,image) VALUES (?,?,?,?)`

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

    const {id_author,name, isbn}= request.body;
    const params = [id_author,name, isbn,id]
    let sql = `UPDATE book SET id_author = COALESCE(?, id_author), name = COALESCE(?, name), isbn = COALESCE(?, isbn) WHERE id_book=?`

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



// Funciones para retornar un json organizado con las clases author y book
function bookModel(res){
    let books = [];
    let author;
    let book;

    books = res.map((value)=>{
        author = new Author(value.id_author, value.first_name, value.last_name);
        book = new Book(value.id_book, value.name, value.isbn, value.image, author);
        book.id_favorite = value.id_favorite;
        return book
    })

    return books
}

function bookModelFav(books,booksFav){
    let booksRes = [];
    let author;
    let book;

    for(let favorite of booksFav){
        for(let book of books){
            if(book.id_book === favorite.id_book){
                book.favorite=true;
                book.id_favorite= favorite.id_favorite
            }
        }
    }

    booksRes = books.map((value,index)=>{
        author = new Author(value.id_author, value.first_name, value.last_name);
        book = new Book(value.id_book, value.name, value.isbn, value.image, author);
        book.favorite = value.favorite;
        book.id_favorite= value.id_favorite
        return book
    })

    return booksRes
}


module.exports = {getBooks, getBook, postBook , putBook, getBooksFav,getBookFav}
