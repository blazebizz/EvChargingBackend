const express = require('express');
const tokenController = require('../../controllers/token/token.controller');
const router = express.Router();

router.post('/generate-token', tokenController.generateToken);
router.post('/create-user', tokenController.createUser);

module.exports = router;
