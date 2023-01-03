const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const userController = require('../controllers/userController');
const { login, signUp } = require('../validation/user');

router.post('/login', validator.body(login), userController.login);
router.post('/signUp', validator.body(signUp), userController.signUp);

module.exports = router;
