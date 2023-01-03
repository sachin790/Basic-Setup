const express = require('express');
const userRoots = require('./user');
const authorRoots = require('./author');
const bookRoots = require('./book');

const router = express.Router();

router.use('/user', userRoots);
router.use('/author', authorRoots);
router.use('/book', bookRoots);

module.exports = router;
