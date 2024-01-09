var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");
const handleResponse = require("../middlewares/handleResponse.middleware");
const authorize = require("../middlewares/authorize.middleware");
const validate = require("../middlewares/validate.middleware");
const { addValidation } = require("../validations/user.validation");

router.post("/", validate(addValidation), userController.add, handleResponse);
router.get("/",userController.getAll, handleResponse);
router.delete("/:id",userController.deleteOne, handleResponse);
router.put("/:id", authorize, userController.edit, handleResponse);

module.exports = router;
