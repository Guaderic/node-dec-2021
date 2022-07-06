const {CustomError} = require("../Errors");
const {userService} = require("../services");
const userValidator = require('../validators/user.validator')
const User = require('../dataBase/User')
const {queryValidator} = require("../validators");

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await userService.findOneUser({_id: id})
            if (!user) {
                return next(new CustomError('User not found'))
            }
            req.user = user
            next();
        } catch (e) {
            next(e)
        }
    },

    // isUserValidForCreate: (req, res, next) => {
    //     try {
    //         const {name, email, age, password} = req.body;
    //
    //         if (!age || !Number.isInteger(age) || age < 18) {
    //             return next(new CustomError('Set valid age'));
    //         }
    //
    //         if (!name || name.length < 3) {
    //             return next(new CustomError('Set valid name'));
    //         }
    //
    //         if (!email || !email.includes('@')) {
    //             return next(new CustomError('Set valid email'));
    //         }
    //
    //         if (!password || name.password < 8) {
    //             return next(new CustomError('Set valid password'));
    //         }
    //
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // },

    isUserValidForUpdate: (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body)
            if (error) {
                throw  new CustomError(error.details[0].message)
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserUnique: async (req, res, next) => {
        try {
            const {email} = req.body;
            const user = await userService.findOneUser({email: email})
            if (user) {
                return next(new CustomError(`User with email ${email} is exist`, 409))
            }
            req.user = user
            next();
        } catch (e) {
            next(e)
        }
    },

    isNewUserValid: async (req, res, next) => {
        try {

            const {error, value} = userValidator.login.validate(req.body)
            if (error) {
                throw  new CustomError(error.details[0].message)
            }
            next()
        } catch (e) {
            next(e)
        }
    },
    isEmailRegistered: async (req, res, next) => {
        try {

        const { email } = req.body

        const userByEmail = await User.findOne({email});
        if (userByEmail){
            throw new CustomError('User with such email is registered',409);
        }
            next();
        } catch (e) {
            next(e);
        }
    },
    isQueryValid: async (req, res, next) => {
        try {
            const {error, value} = queryValidator.findAll.validate(req.query)

            if (error) {
                return next (new CustomError(error.details[0].message))
            }

            req.query = value;
            next();
        } catch (e) {
            next(e);
        }
    },
    CheckUserIsPresent: async (req, res, next) => {
        try {

            const { email } = req.body

            const userByEmail = await User.findOne({email});
            if (!userByEmail){
                throw new CustomError('User not found',404);
            }

            req.user = userByEmail
            next();
        } catch (e) {
            next(e);
        }
    },
}