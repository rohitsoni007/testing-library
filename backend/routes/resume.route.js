var express = require("express");
var router = express.Router();
const resumeController = require("../controllers/resume.controller");
const validate = require("../middlewares/validate.middleware");
const handleResponse = require("../middlewares/handleResponse.middleware");
const { addValidation, getOneValidation, editValidation } = require("../validations/resume.validation");
const authorize = require("../middlewares/authorize.middleware");

router.post("/", authorize,  validate(addValidation), resumeController.add, handleResponse);
router.put("/:resumeId", authorize, validate(editValidation), resumeController.edit, handleResponse);
router.delete("/:resumeId", authorize, resumeController.deleteOne, handleResponse);
router.get("/:resumeId", authorize, validate(getOneValidation), resumeController.getOne, handleResponse);
router.get("/", authorize, resumeController.getAll, handleResponse);

module.exports = router;
