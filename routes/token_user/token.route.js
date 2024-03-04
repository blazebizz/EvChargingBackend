const express = require('express');
const tokenController = require('../../controllers/token_user/token.controller');
const router = express.Router();

router.post('/generate-token', tokenController.generateToken);
router.post('/admin-token', tokenController.generateAdminToken);
router.post('/create-user', tokenController.createUser);
router.get('/user', tokenController.allUser);
router.post('/check-token', tokenController.checkToken);
router.post('/user-access', tokenController.changeUserAccess);

module.exports = router;
