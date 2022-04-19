const {Router} = require("express");
const favoriteController = require("../controller/favoriteController")

const router = Router();

router.get("/favorite/:id", favoriteController.getFavorites);
router.post("/favorite", favoriteController.postFavorite);
router.delete("/favorite/:id", favoriteController.deleteFavorite);

module.exports= router