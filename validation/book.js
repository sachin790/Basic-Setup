const Joi = require('joi');

exports.addBook = Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
    authorId: Joi.string().required(),
    quantity: Joi.number().required(),
});

exports.updateBook = Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
    code: Joi.string().required(),
    authorId: Joi.string().required(),
    quantity: Joi.number().required(),
});

exports.id = Joi.object().keys({
    id: Joi.string().required(),
});
