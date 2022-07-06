const Joi = require("joi");

const { emailValidator, passwordValidator, } = require("./common.validator");


module.exports = {
    newUserValidator: Joi.object({
        name: nameValidator.required(),
        age: ageValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
        phone: phoneValidator.required(),
    }),
    login: Joi.object({
        email: emailValidator.required(),
        password: passwordValidator.required()
    }),




}