const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const permission = require('../middlewares/role');
const bookController = require('../controllers/bookController');
const { addBook, updateBook, id } = require('../validation/book');

router.post(
    '/add',
    authentication,
    permission('basic', 'supervisor', 'admin'),
    validator.body(addBook),
    bookController.addBook
);
router.put(
    '/update',
    authentication,
    permission('basic', 'supervisor', 'admin'),
    validator.body(updateBook),
    bookController.updateBook
);
router.delete(
    '/delete',
    authentication,
    permission('basic', 'supervisor', 'admin'),
    validator.query(id),
    bookController.deleteBook
);
router.get(
    '/get',
    authentication,
    permission('basic', 'supervisor', 'admin'),
    bookController.getBook
);
router.get(
    '/getById',
    authentication,
    permission('basic', 'supervisor', 'admin'),
    validator.query(id),
    bookController.getBookById
);

module.exports = router;
