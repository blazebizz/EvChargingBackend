const express = require('express');
const generateTokenController = require('../controllers/charging_station.controller');
const router = express.Router();

router.post('/charging-station', generateTokenController.directCreateChargingStation);

module.exports = router;