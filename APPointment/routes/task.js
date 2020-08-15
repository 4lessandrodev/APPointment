var express = require('express');
const controller = require('../controller/task');
var router = express.Router();

router.get('/', controller.index);

router.get('/:id', controller.show);

router.post('/', controller.store);

router.delete('/:id', controller.delete);

module.exports = router;