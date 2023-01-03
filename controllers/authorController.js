const { lowerCase, size } = require('lodash');
const utils = require('../utils/apiHelper');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Author } = require('../models');

exports.addAuthor = async (payloadData, res) => {
    const params = payloadData.body;

    const checkEmailAlreadyExist = await utils.getData(Author, {
        query: { email: lowerCase(params.email), isDeleted: false },
        fields: ['_id'],
    });
    if (size(checkEmailAlreadyExist)) {
        return sendErorMessage('This Email is already registered with us.', {}, res);
    }
    const obj = {
        firstName: params.firstName,
        lastName: params.lastName,
        email: lowerCase(params.email),
    };
    const data = await utils.saveData(Author, obj);
    return sendSuccessMessage('success', data, res);
};
exports.updateAuthor = async (payloadData, res) => {
    const pararms = payloadData.body;

    const obj = {
        firstName: pararms.firstName,
        lastName: pararms.lastName,
        email: lowerCase(pararms.email),
    };
    const data = await utils.updateData(Author, { _id: pararms.id }, obj);
    return sendSuccessMessage('success', data, res);
};
exports.deleteAuthor = async (payloadData, res) => {
    const pararms = payloadData.query;

    await await utils.updateData(Author, { _id: pararms.id }, { isDeleted: true });
    return sendSuccessMessage('success', {}, res);
};
exports.getAuthor = async (payloadData, res) => {
    const data = await utils.getData(Author, {
        query: { isDeleted: false },
    });
    return sendSuccessMessage('success', data, res);
};
exports.getAuthorById = async (payloadData, res) => {
    const pararms = payloadData.query;

    const data = await utils.getData(Author, { query: { _id: pararms.id, isDeleted: false } });
    return sendSuccessMessage('success', data, res);
};
