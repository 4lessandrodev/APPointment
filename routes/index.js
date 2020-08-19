const express = require('express');
const controller = require('../controller/index');
const router = express.Router();
const { validateUser } = require('../middleware/validateFields');


router.get('/', controller.index);

router.post('/register', validateUser(), controller.register);

router.post('/login', validateUser(), controller.login);

module.exports = router;
