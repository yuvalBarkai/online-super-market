const Joi = require("joi");
const Msg = require("../utilities/validationMsgs");

module.exports = Joi.object({
    product_name: Joi.string().max(40).required().messages({
        'string.base': Msg.base('product_name', 'string'),
        'string.max': Msg.max('product_name', 40),
        'any.required': Msg.required('product_name'),
    }),
    category_id: Joi.number().min(0).required().messages({
        'number.base': Msg.base('category_id', 'number'),
        'number.min': Msg.nMin('category_id', 0),
        'any.required': Msg.required('category_id'),
    }),
    product_price: Joi.number().min(0).required().messages({
        'number.base': Msg.base('product_price', 'number'),
        'number.min': Msg.min('product_price', 0),
        'any.required': Msg.required('product_price'),
    }),
    keepImage: Joi.boolean(),
    product_id: Joi.number(),
});