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
})

module.exports = {
    login: validator(loginSchema),

}