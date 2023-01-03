const { lowerCase, size } = require('lodash');
const utils = require('../utils/apiHelper');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Book } = require('../models');

exports.addBook = async (payloadData, res) => {
    const pararms = payloadData.body;

    const checkBookAlreadyExist = await utils.getData(Book, {
        query: { code: lowerCase(pararms.code), isDeleted: false },
        fields: ['_id'],
    });
    if (size(checkBookAlreadyExist)) {
        return sendErorMessage('This Book is already registered with us.', {}, res);
    }
    const obj = {
        name: pararms.name,
        code: lowerCase(pararms.code),
        isDeleted: false,
        authorId: pararms.authorId,
        quantity: pararms.quantity,
    };
    const data = await utils.saveData(Book, obj);
    return sendSuccessMessage('success', data, res);
};
exports.updateBook = async (payloadData, res) => {
    const pararms = payloadData.body;

    const obj = {
        name: pararms.name,
        code: lowerCase(pararms.code),
        authorId: pararms.authorId,
        quantity: pararms.quantity,
    };
    const data = await utils.updateData(Book, { _id: pararms.id }, obj);
    return sendSuccessMessage('success', data, res);
};
exports.deleteBook = async (payloadData, res) => {
    const pararms = payloadData.query;

    await utils.updateData(Book, { _id: pararms.id }, { isDeleted: true }, {});
    return sendSuccessMessage('success', {}, res);
};
exports.getBook = async (payloadData, res) => {
    const populates = ['authorId'];
    const data = await utils.getData(Book, {
        query: { isDeleted: false },
        populates,
    });
    return sendSuccessMessage('success', data, res);
};
exports.getBookById = async (payloadData, res) => {
    const pararms = payloadData.query;

    const populates = ['authorId'];
    const data = await utils.getData(Book, {
        query: { _id: pararms.id, isDeleted: false },
        populates,
    });
    return sendSuccessMessage('success', data, res);
};
