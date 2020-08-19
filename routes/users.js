const express = require('express');
const router = express.Router();
const controller = require('../controller/user');
const { validateUser } = require('../middleware/validateFields');

router.get('/', controller.index);

router.get('/search', controller.show);

router.delete('/', controller.delete);

router.put('/', validateUser(), controller.update);

module.exports = router;
