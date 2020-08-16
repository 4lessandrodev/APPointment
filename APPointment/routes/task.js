var express = require('express');
const controller = require('../controller/task');
const { validateParam, validateTask } = require('../middleware/validateFields');
var router = express.Router();

router.get('/', controller.index);

router.get('/:id', validateParam(), controller.show);

router.post('/', validateTask(), controller.store);

router.delete('/:id', validateParam(), controller.delete);

router.put('/:id', validateParam(), validateTask(), controller.update);

module.exports = router;