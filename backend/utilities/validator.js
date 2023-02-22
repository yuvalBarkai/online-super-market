const Joi = require("joi");

/**
 * A function that returns another function and allows us to create
 * different validating functions
 * 
 * @param {Joi.object} schema 
 * @returns {(payload)=> {errors, value}} A function that has a parameter
 * that will have the schema used on him with the validate function (abortEarly: true)
 */
const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: true });

const orderSchema = require("../schemas/orderSchema");
const loginSchema = require("../schemas/loginSchema");
const registrationPart1Schema = require("../schemas/registrationPart1Schema");
const registrationSchema = require("../schemas/registrationSchema");
const cartProductSchema = require("../schemas/cartProductSchema");
const newProductSchema = require('../schemas/newProductSchema');
const editProductSchema = require('../schemas/editProductSchema');

module.exports = {
    login: validator(loginSchema),
    registerationPart1: validator(registrationPart1Schema),
    register: validator(registrationSchema),
    order: validator(orderSchema),
    cartProduct: validator(cartProductSchema),
    newProduct: validator(newProductSchema),
    editProduct: validator(editProductSchema),
}