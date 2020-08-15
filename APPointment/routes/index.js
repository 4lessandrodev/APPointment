var express = require('express');
const controller = require('../controller/index');
var router = express.Router();

/* GET home page. */
router.get('/', controller.index);

router.post('/register', controller.register);

module.exports = router;
