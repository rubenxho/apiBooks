const {Router} = require("express");
const authController = require("../controller/authController")

const router = Router();

router.post("/register", authController.postRegister);
router.post("/login", authController.postLogin);

module.exports= router