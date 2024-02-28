const express = require('express');
const generateTokenController = require('../controllers/charging_station.controller');
const router = express.Router();

router.post('/charging_station', generateTokenController.directCreateChargingStation);

module.exports = router;