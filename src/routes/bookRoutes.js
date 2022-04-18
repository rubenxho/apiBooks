const {Router} = require("express");
const bookController = require("../controller/bookController")

const router = Router();

router.get("/books", bookController.getBooks);
router.get("/book/:id", bookController.getBook);
router.post("/book", bookController.postBook);
router.put("/book/:id", bookController.putBook);

module.exports= router