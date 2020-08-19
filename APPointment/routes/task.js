var express = require('express');
const controller = require('../controller/task');
const { validateParam, validateUpdateTask, validateNewTask } = require('../middleware/validateFields');
var router = express.Router();

router.get('/', controller.index);

router.get('/:id', validateParam(), controller.show);

router.post('/', validateNewTask(), controller.store);

router.delete('/:id', validateParam(), controller.delete);

router.put('/:id', validateParam(), validateUpdateTask(), controller.update);

module.exports = router;