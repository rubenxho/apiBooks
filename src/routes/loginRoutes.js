const {Router} = require("express");
const loginController = require("../controller/loginController")

const router = Router();

router.post("/login", loginController.postLogin);

module.exports= router