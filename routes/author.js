const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const permission = require('../middlewares/role');
const authorController = require('../controllers/authorController');
const { addAuthor, updateAuthor, id } = require('../validation/author');

router.post(
    '/add',
    authentication,
    permission('basic', 'supervisor', 'admin'),
    validator.body(addAuthor),
    authorController.addAuthor
);
router.put(
    '/update',
    authentication,
    permission('basic', 'supervisor', 'admin'),
    validator.body(updateAuthor),
    authorController.updateAuthor
);
router.delete(
    '/delete',
    authentication,
    permission('basic', 'supervisor', 'admin'),
    validator.query(id),
    authorController.deleteAuthor
);
router.get(
    '/get',
    authentication,
    permission('basic', 'supervisor', 'admin'),
    authorController.getAuthor
);
router.get(
    '/getById',
    authentication,
    permission('basic', 'supervisor', 'admin'),
    validator.query(id),
    authorController.getAuthorById
);

module.exports = router;
