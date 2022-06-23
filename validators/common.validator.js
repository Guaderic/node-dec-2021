const Joi = require('joi')

const { EMAIL_REGEX, PASSWORD_REGEX} = require('../constants/regexp.constant')


module.exports = {
    emailValidator: Joi.string().regex(EMAIL_REGEX).lowercase().trim(),
    passwordValidator: Joi.string().regex(PASSWORD_REGEX).trim(),
    nameValidator: Joi.string().alphanum().min(3).max(100),
    ageValidator: Joi.number().integer().min(1).max(120),
}