const Joi = require("joi");
const Msg = require("../utilities/validationMsgs");

module.exports = Joi.object({
    first_name: Joi.string().max(30).required().messages({
        'string.base': Msg.base('first_name', 'string'),
        'string.max': Msg.max('first_name', 30),
        'any.required': Msg.required('first_name'),
    }),
    last_name: Joi.string().max(30).required().messages({
        'string.base': Msg.base('last_name', 'string'),
        'string.max': Msg.max('last_name', 30),
        'any.required': Msg.required('last_name'),
    }),
    user_email: Joi.string().email().max(60).required().messages({
        'string.base': Msg.base('user_email', 'string'),
        'string.email': Msg.email('user_email'),
        'string.max': Msg.max('user_email', 60),
        'any.required': Msg.required('user_email'),
    }),
    password: Joi.string().max(60).required().messages({
        'string.base': Msg.base('password', 'string'),
        'string.max': Msg.max('password', 60),
        'any.required': Msg.required('password'),
    }),
    id_card: Joi.number().required().messages({
        'number.base': Msg.base('id_card', 'number'),
        'any.required': Msg.required('id_card')
    }),
    city_id: Joi.number().min(0).required().messages({
        'number.base': Msg.base('city_id', 'number'),
        'number.min': Msg.min('city_id', 0),
        'any.required': Msg.required('city_id')
    }),
    street_name: Joi.string().max(60).required().messages({
        'string.base': Msg.base('street_name', 'string'),
        'string.max': Msg.max('street_name', '60'),
        'any.required': Msg.required('street_name'),
    }),
});