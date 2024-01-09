var express = require("express");
var router = express.Router();
const authController = require("../controllers/auth.controller");
const handleResponse = require("../middlewares/handleResponse.middleware");
const authorize = require("../middlewares/authorize.middleware");
const { registerValidation } = require("../validations/auth.validation");
const validate = require("../middlewares/validate.middleware");

router.post("/register", validate(registerValidation), authController.register, handleResponse);
router.post("/login",authController.login, handleResponse);
router.get("/me", authorize, authController.me, handleResponse);

module.exports = router;
