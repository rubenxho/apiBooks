class Book{

    constructor(id_book, name, isbn, image, author){
        this.id_book = id_book;
        this.name = name;
        this.isbn = isbn;
        this.image=image
        this.author = author;
        this.favorite;
        this.id_favorite;
    }
}


module.exports = Book