exports.sendSuccessMessage = (message, data, res) => {
    const successMsg = {
        code: 200,
        message,
        data,
    };
    return res.status(200).send(successMsg);
};

exports.sendSuccessDeletionMessage = (message, data, res) => {
    const successMsg = {
        code: 201,
        message,
        data,
    };
    return res.status(201).send(successMsg);
};

exports.sendErorMessage = (message, data, res) => {
    const errorMessage = {
        statusCode: 400,
        message,
        data,
    };
    return res.status(400).send(errorMessage);
};

exports.UnauthorisedMessage = (res) => {
    const message = {
        statusCode: 401,
        message: 'The token is not valid',
    };
    return res.status(401).send(message);
};

exports.PermissionMessage = (res) => {
    const message = {
        statusCode: 401,
        message: 'Not Allowed to Access the Api',
    };
    return res.status(401).send(message);
};
