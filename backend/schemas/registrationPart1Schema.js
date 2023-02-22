const Joi = require("joi");
const Msg = require("../utilities/validationMsgs");

function idCardLength(value) {
    const length = String(value).length;
    if (length < 6 || length > 10)
        throw new Error("id_card needs to have a length between 6 - 10");
    return value;
};

module.exports = Joi.object({
    id_card: Joi.number().required().custom(idCardLength).messages({
        'number.base': Msg.base('id_card', 'number'),
        'any.required': Msg.required('id_card'),
        'any.custom': "id_card needs to have a length between 6 - 10"
    }),
    user_email: Joi.string().email().max(60).required().messages({
        'string.base': Msg.base('user_email', 'string'),
        'string.email': Msg.email('user_email'),
        'string.max': Msg.max('user_email', 60),
        'any.required': Msg.required('user_email'),
    }),
    password: Joi.string().min(2).max(60).required().messages({
        'string.base': Msg.base('password'),
        'string.max': Msg.max(60),
        'string.min': Msg.min('password', 2),
        'any.required': Msg.required('password'),
    }),
    passwordConfirmation: Joi.allow(),
});