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

const loginSchema = Joi.object({
    user_email: Joi.string().email().required(),
    password: Joi.string().min(2).max(60).required()
});

const registrationSchema = Joi.object({
    first_name: Joi.string().max(30).required(),
    last_name: Joi.string().max(30).required(),
    user_email: Joi.string().max(60).required(),
    password: Joi.string().max(60).required(),
    id_card: Joi.number().required(),
    city_id: Joi.number().required(),
    street_name: Joi.string().max(60).required(),
});

module.exports = {
    login: validator(loginSchema),
    register: validator(registrationSchema),

}