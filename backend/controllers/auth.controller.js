const User = require('../models/user.model');
const { createResponse, httpClient } = require('../utils/commonFunctions.util');
const { MESSAGES } = require('../utils/constant.util');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = process.env;


const _auth = {};

_auth.register = async (req, res, next) => {
    try {
        const {
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
        } = req.body;

        const exist = await User.findOne({ email });

        if (exist) {
            throw { message: MESSAGES.EMAIL_EXIST };
        }

        const userData = {
            email,
            identifier: `email-${email}`,
            password,
            firstName,
            lastName,
        };

        let user = await new User(userData).save();
        
        user.password = undefined;

        const resp = {
            user,
        };

        createResponse(req, true, MESSAGES.REGISTER, resp);
        return next();
    } catch (error) {
        createResponse(req, false, error.message || MESSAGES.ERROR);
        return next();
    }
};

_auth.login = async (req, res, next) => {
    try {
        const { email, password, type } = req.body;

        
        const userFilter = {
            email,
        };

        const user = await User.findOne(userFilter).select('+password');

        if (!user) {
            throw { message: MESSAGES.EMAIL_NOT_EXIST };
        }

        if (user.isDeleted || !user.isActive) {
            throw { message: MESSAGES.ACCOUNT_DEACTIVATED };
        }
        
        const checkPassword = user.comparePassword(password, user.password);

        if (!checkPassword) {
            throw { message: MESSAGES.INVALID_CREDENTIAL };
        }

        const token = getToken(user._id);

        user.password = undefined;

        const resp = {
            user,
            token,
        };


        createResponse(req, true, MESSAGES.LOGIN, resp);
        return next();
    } catch (error) {
        createResponse(req, false, error.message || MESSAGES.ERROR);
        return next();
    }
};


_auth.me = async (req, res, next) => {
    try {
        const resp = {
            user: req.user,
        };


        createResponse(req, true, '', resp);
        return next();
    } catch (error) {
        createResponse(req, false, error.message || MESSAGES.ERROR);
        return next();
    }
};


const getToken = (id) => {
    const jwtObj = { id };

    const token = jwt.sign(jwtObj, JWT_SECRET, {
        expiresIn: JWT_EXPIRY,
    });
    return token;
};


module.exports = _auth;