function base(property, type) {
    if (type == 'number')
        return `${property} must contain only numbers`;
    else if (type == 'string')
        return `${property} must not be empty or a number`;
    else if (type == 'date')
        return `${property} must be a proper date`;
    else
        return `${property} must be a ${type}`;
}

function required(property) {
    return `${property} is required`;
}

function email(property) {
    return `${property} needs to be in an email format`;
}

function boolean(property) {
    return `${property} needs to be true or false`;
}

function nMin(property, min) {
    if (min == 0)
        return `${property} must be a positive number`;
    else
        return `${property} must be ${min} or more`;
}

function nMax(property, max) {
    return `${property} must be less then ${max + 1}`;
}

function min(property, min) {
    return `${property} must have a length that is ${min} or more`;
}

function max(property, max) {
    return `${property} must have a length that is ${max} or less`;
}

module.exports = {
    base, required, email, boolean,
    nMin, nMax, min, max,
}