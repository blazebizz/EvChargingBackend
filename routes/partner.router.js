var express = require('express');
const { partnerOnboard, fetchPartnersData, fetchPartnersStatusWiseData } = require('../controllers/partnerOnboard.controller');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/onboard', partnerOnboard);
router.post('/fetch-onboard-data', fetchPartnersStatusWiseData);

router.get('/fetch-onboard', fetchPartnersData);

module.exports = router;
