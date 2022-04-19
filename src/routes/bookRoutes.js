const {Router} = require("express");
const bookController = require("../controller/bookController")

const router = Router();

router.get("/books", bookController.getBooks);   //endpoint Original todos los libros
router.get("/books/:id", bookController.getBooksFav); //endpoint Modificado todos los libros para trabajar con favoritos
router.get("/book/:id", bookController.getBook); //endpoint un libro
router.get("/book/:id_book/:id_user", bookController.getBookFav);//endpoint Modificado un libro para trabajar con favoritos
router.post("/book", bookController.postBook);
router.put("/book/:id", bookController.putBook);

module.exports= router