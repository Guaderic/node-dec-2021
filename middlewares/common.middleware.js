const { Types } = require('mongoose')
const {CustomError}  = require("../Errors");
const Joi = require("joi");
const configs = require("../constants/configs");


module.exports = {

    module.exports = {
        nameValidator: Joi.string().alphanum().min(2).max(100),
        ageValidator: Joi.number().integer().min(1).max(130),
        emailValidator: Joi.string().regex(constants.EMAIL_REGEX).lowercase().trim(),
        passwordValidator: Joi.string().regex(constants.PASSWORD_REGEX).required().trim(),
        phoneValidator: Joi.string().regex(constants.PHONE_REGEX).required().trim(),
    };

}