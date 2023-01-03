const { PermissionMessage } = require('../helpers/sendResponse');

const permit = (...permittedRoles) => (request, response, next) => {
    const user = request.userData;
    if (user && permittedRoles.includes(user.role)) {
        next();
    } else {
        PermissionMessage(response);
    }
};

module.exports = permit;
