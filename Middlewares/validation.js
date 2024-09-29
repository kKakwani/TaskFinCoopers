const Joi = require('joi');

// User Registration Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

// User Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(data);
};

// Task Creation Validation
const createTaskValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        description: Joi.string().required(),
        dueDate: Joi.date().required(),
        status: Joi.string().valid('TO_DO', 'IN_PROGRESS', 'DONE'),
    });
    return schema.validate(data);
};

// Task Update Validation
const updateTaskValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(3).allow('').optional(),
        description: Joi.string().allow('').optional(),
        dueDate: Joi.date().allow('').optional(),
        status: Joi.string().valid('TO_DO', 'IN_PROGRESS', 'DONE').allow('').optional(),
    })
    return schema.validate(data);
};

module.exports = {
    registerValidation,
    loginValidation,
    createTaskValidation,
    updateTaskValidation
};
