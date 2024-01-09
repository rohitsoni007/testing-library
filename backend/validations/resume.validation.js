const Joi = require("joi");

const addValidation = {
  body: {
    name: Joi.string().max(255).required(),
    email: Joi.string().max(255).required(),
    phone: Joi.number().required(),
  },
};

const getOneValidation = {
  params: {
    resumeId: Joi.string().hex().length(24).required(),
  },
};

const editValidation = {
  ...getOneValidation,
  body: {
    name: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required(),
    phone: Joi.number().required(),
    
  },
};



module.exports = {
  addValidation,
  getOneValidation,
  editValidation,
};
