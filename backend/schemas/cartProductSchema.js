const Joi = require("joi");
const Msg = require("../utilities/validationMsgs");

module.exports = Joi.object({
    product_id: Joi.number().min(0).required().messages({
        'number.base': Msg.base('product_id', 'number'),
        'number.min': Msg.nMin('product_id', 0),
        'any.required': Msg.required('product_id'),
    }),
    amount: Joi.number().min(1).required().messages({
        'number.base': Msg.base('amount', 'number'),
        'number.min': Msg.nMin('amount', 1),
        'any.required': Msg.required('amount'),
    }),
    total_price: Joi.number().min(0).required().messages({
        'number.base': Msg.base('total_price', 'number'),
        'number.min': Msg.nMin('total_price', 0),
        'any.required': Msg.required('total_price')
    }),
    cart_id: Joi.number().min(0).required().messages({
        'number.base': Msg.base('cart_id', 'number'),
        'number.min': Msg.nMin('cart_id', 0),
        'any.required': Msg.required('cart_id'),
    }),
});