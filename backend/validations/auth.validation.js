const Joi = require('joi');

const registerValidation = {
    body: {
        firstName: Joi.string().trim().max(255).required(),
        lastName: Joi.string().trim().max(255).required(),
        email: Joi.string().email().trim().max(255).required(),
        password: Joi.string().min(6).max(10).required(),
    },
};

const loginValidation = {
    body: {
        email: Joi.string().email().trim().max(255).required(),
        password: Joi.string().min(6).max(10).required(),
        
    },
};



module.exports = {
    registerValidation,
    loginValidation,
};
