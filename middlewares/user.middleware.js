const {CustomError} = require("../Errors");
const {userService} = require("../services");

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

    isUserValidForCreate: (req, res, next) => {
        try {
            const { name, email, age, password } = req.body;

            if (!age || !Number.isInteger(age) || age < 18) {
                return next(new CustomError('Set valid age'));
            }

            if (!name || name.length < 3) {
                return next(new CustomError('Set valid name'));
            }

            if (!email || !email.includes('@')) {
                return next(new CustomError('Set valid email'));
            }

            if (!password || name.password < 8) {
                return next(new CustomError('Set valid password'));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidForUpdate: (req, res, next) => {
        try {
            const { name,  age } = req.body;

            if (!age && !Number.isInteger(age) || age < 18) {
                return next(new CustomError('Set valid age'));
            }

            if (!name && name.length < 3) {
                return next(new CustomError('Set valid name'));
            }

            req.dateForUpdate = { name, age };
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserUnique: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await userService.findOneUser({email: email})
            if (user) {
                return next(new CustomError(`User with email ${email} is exist`, 409))
            }
            req.user = user
            next();
        } catch (e) {
            next(e)
        }
    }


}