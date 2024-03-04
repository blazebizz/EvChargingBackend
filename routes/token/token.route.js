const express = require('express');
const tokenController = require('../../controllers/token/token.controller');
const router = express.Router();

router.post('/generate-token', tokenController.generateToken);
router.post('/create-user', tokenController.createUser);
router.get('/user', tokenController.AllUser);
router.post('/check-token', tokenController.checkToken);

module.exports = router;
