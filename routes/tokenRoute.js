var express = require('express');
const generateTokenController = require('../controllers/generateTokenController');
var router = express.Router();

router.post('/generate_token', generateTokenController.generatetoken);
router.post('/createuser', generateTokenController.createUser);

module.exports = router;
