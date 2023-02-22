const Joi = require("joi");
const Msg = require("../utilities/validationMsgs");

function arrivalDatePast(value) {
    const now = new Date();
    now.setHours(0,0,0,0);
    console.log(now);
    if (now > new Date(value))
        throw new Error("arrival date must be in the future");
    return value;
};

module.exports = Joi.object({
    city_id: Joi.number().min(0).required().messages({
        'number.base': Msg.base('city_id', 'number'),
        'number.min': Msg.nMin('city_id', 0),
        'any.required': Msg.required('city_id'),
    }),
    street_name: Joi.string().min(2).max(60).required().messages({
        'string.base': Msg.base('street_name', 'string'),
        'string.min': Msg.min('street_name', 2),
        'string.max': Msg.max('street_name', 60),
        'any.required': Msg.required('street_name')
    }),
    arrival_date: Joi.date().required().custom(arrivalDatePast).messages({
        'date.base': Msg.base('arrival_date', 'date'),
        'any.required': Msg.required('arrival_date'),
        'any.custom': 'arrival date must be in the future'
    }),
    credit_card_digits: Joi.number().min(1000).max(9999).required().messages({
        'number.base': Msg.base('credit_card_digits', 'number'),
        'number.min': 'credit card digits must be 4 digits',
        'number.max': 'credit card digits must be 4 digits',
        'any.required': Msg.required('credit_card_digits'),
    }),
    cart_id: Joi.number().min(0).required().messages({
        'number.base': Msg.base('cart_id', 'number'),
        'number.min': Msg.nMin('cart_id', 0),
        'any.required': Msg.required('cart_id')
    }),
    order_price: Joi.number().min(0).required().messages({
        'number.base': Msg.base('order_price', 'number'),
        'number.min': Msg.nMin('order_price', 0),
        'any.required': Msg.required('order_price')
    }),
});

