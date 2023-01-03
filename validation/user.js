const Joi = require('joi');

exports.login = Joi.object().keys({
    emailOrPhone: Joi.string().required(),
    password: Joi.string().required(),
});

exports.signUp = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
