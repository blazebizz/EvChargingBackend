var express = require('express');
const userDashboardController = require('../controllers/userDashboard');
var router = express.Router();

router.post('/user/dashboard', userDashboardController.userDashboard);
// router.post('/createuser', generateTokenController.createUser);

module.exports = router;
