const {Router} = require("express");
const authorController = require("../controller/authorController")

const router = Router();

router.get("/authors", authorController.getAuthors);
router.get("/author/:id", authorController.getAuthor);
router.post("/author", authorController.postAuthor);
router.put("/author/:id", authorController.putAuthor);

module.exports= router