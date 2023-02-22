const Joi = require("joi");

module.exports = Joi.object({
    first_name: Joi.string().max(30).required().messages({
        'string.base': 'first_name is missing', 'string.max': 'first_name must be less then 31 characters',
        'any.required': 'first_name is required',
    }),
    last_name: Joi.string().max(30).required().messages({
        'string.base': 'last_name is missing', 'string.max': 'last_name needs to be less then 31 characters',
        'any.required': 'last_name is required',
    }),
    user_email: Joi.string().email().max(60).required().messages({
        'string.base': 'user_email is missing', 'string.email': 'user_email needs to be in the email format',
        'string.max': 'user_email needs to be less then 61 characters', 'any.required': 'user_email is required'
    }),
    password: Joi.string().max(60).required().messages({
        'string.base': 'password is missing', 'string.max': 'password needs to be less then 61 characters',
        'any.required': 'password is required'
    }),
    id_card: Joi.number().required()
        .messages({ 'number.base': 'id_card is missing', 'any.required': 'id_card is required' }),
    city_id: Joi.number().min(0).required().messages({
        'number.base': 'city_id is missing', 'number.min': 'city_id needs to be a positive number', 'any.required': 'city_id is required'
    }),
    street_name: Joi.string().max(60).required().messages({
        'string.base': 'street_name is missing', 'string.max': 'street_name needs to be less then 61 characters',
        'any.required': 'street_name is required'
    }),
});