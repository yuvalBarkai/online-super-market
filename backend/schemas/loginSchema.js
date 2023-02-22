const Joi = require("joi");
const Msg = require("../utilities/validationMsgs");

module.exports = Joi.object({
    user_email: Joi.string().email().required().messages({
        'string.base': Msg.base('user_email', 'string'),
        'string.email': Msg.email('user_email'),
        'any.required': Msg.required('user_email'),
    }),
    password: Joi.string().min(2).max(60).required().messages({
        'string.base': Msg.base('password', 'string'),
        'string.min': Msg.min('password', 2),
        'string.max': Msg.max('password', 60),
        'any.required': Msg.required('password'),
    }),
});
