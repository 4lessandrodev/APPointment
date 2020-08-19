const express = require('express');
const router = express.Router();
const teamController = require('../controller/team');
const memberController = require('../controller/team_has_users');
const { validateTeam, validateParam, validateMember } = require('../middleware/validateFields');

router.get('/', teamController.index);

router.get('/:id', validateParam(), teamController.show);

router.post('/', validateTeam(), teamController.store);

router.delete('/:id', validateParam(), teamController.delete);

router.put('/:id', validateParam(), validateTeam(), teamController.update);

router.post('/members', validateMember(), memberController.store);

router.delete('/members/remove', validateMember(), memberController.delete);

module.exports = router;