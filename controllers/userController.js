/* eslint-disable no-underscore-dangle */
const Jwt = require('jsonwebtoken');
const { lowerCase, size } = require('lodash');
const moment = require('moment');
const { User } = require('../models');
const commonHelper = require('../helpers/common');
const utils = require('../utils/apiHelper');
const env = require('../config');

const privateKey = env.JWTOKEN;
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const logger = require('../helpers/logger');

exports.login = async (payloadData, res) => {
    const pararms = payloadData.body;

    const checkEmail = await utils.getData(User, {
        query: {
            $or: [{
                email: lowerCase(pararms.emailOrPhone),
            }, {
                phoneNumber: pararms.emailOrPhone,
            }],
            isDeleted: false,
        },
        fields: ['_id', 'password', 'email', 'firstName', 'lastName', 'role'],
    });
    if (!size(checkEmail)) {
        return sendErorMessage('This Email or Phone is not registered with us.', {}, res);
    }
    // eslint-disable-next-line max-len
    const checkPasswordBoolean = await commonHelper.comparePassword(pararms.password, checkEmail[0].password);
    if (!checkPasswordBoolean) return sendErorMessage('Password is not valid.', {}, res);
    const tokenData = {
        email: checkEmail[0].email,
        role: checkEmail[0].role,
        _id: checkEmail[0]._id,
        date: moment().toDate(),
    };
    const token = Jwt.sign(tokenData, privateKey, { expiresIn: '1d' });
    const data = {
        token,
        name: `${checkEmail[0].firstName} ${checkEmail[0].lastName}`,
    };
    logger.info(`${checkEmail[0]._id} ${moment().toDate()}`);
    return sendSuccessMessage('success', data, res);
};

exports.signUp = async (payloadData, res) => {
    const pararms = payloadData.body;

    const checkEmailAlreadyExist = await utils.getData(User, {
        query: { email: lowerCase(pararms.email), isDeleted: false },
        fields: ['_id', 'password', 'email', 'firstName', 'lastName'],
    });
    if (size(checkEmailAlreadyExist)) return sendErorMessage('This Email is already registered with us.', {}, res);
    const passwordHash = await commonHelper.generateNewPassword(pararms.password);
    const obj = {
        firstName: pararms.firstName,
        lastName: pararms.lastName,
        phoneNumber: pararms.phoneNumber,
        email: lowerCase(pararms.email),
        password: passwordHash,
    };
    await utils.saveData(User, obj);
    return sendSuccessMessage('success', {}, res);
};
