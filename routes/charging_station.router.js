const express = require('express');
const generateTokenController = require('../controllers/charging_station.controller');
const router = express.Router();

router.post('/direct-create-station', generateTokenController.directCreateChargingStation);
router.get('/station-by-code', generateTokenController.getChargingStationByCode);
router.get('/station-by-user', generateTokenController.getChargingStationByUser);
router.post('/station', generateTokenController.createChargingStation);
router.patch('/station', generateTokenController.updateChargingStation);

module.exports = router;