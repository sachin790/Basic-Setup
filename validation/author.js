const Joi = require('joi');

exports.addAuthor = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
});

exports.updateAuthor = Joi.object().keys({
    id: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
});

exports.id = Joi.object().keys({
    id: Joi.string().required(),
});
