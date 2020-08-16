const express = require('express');
const router = express.Router();
const controller = require('../controller/team');
const { validateTeam, validateParam } = require('../middleware/validateFields');

router.get('/', controller.index);

router.get('/:id', validateParam(), controller.show);

router.post('/', validateTeam(), controller.store);

router.delete('/:id', validateParam(), controller.delete);

router.put('/:id', validateParam(), validateTeam(), controller.delete);

module.exports = router;