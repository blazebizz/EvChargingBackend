var express = require('express');
const partnerOnboardCtrl = require('../controllers/partnerOnboard.controller');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/**
 * @api {POST} /api/v1/partner/onboard Partner Onbard
 * @apiName Partner Onbard
 * @apiGroup Partner
 *
 * @apiBody {String} [userId]
 * @apiBody {Object} [onboardData]
 *
 */

router.post('/onboard', partnerOnboardCtrl.partnerOnboard);

/**
 * @api {POST} /api/v1/partner/fetch-onboard-data Fetch partner onbard data
 * @apiName Fetch Partner Onbard
 * @apiGroup Partner
 *
 * @apiBody {String} [start_date] in "DD-MM-yyyy" format
 * @apiBody {String} [end_date] in "DD-MM-yyyy" format
 * @apiBody {String} [status] only PENDING, REJECT, APPROVE are allowed
 *
 *
 */
router.post('/fetch-onboard-data', partnerOnboardCtrl.fetchPartnersStatusWiseData);

/**
 * @api {POST} /api/v1/partner/update-onboard-status Update partner onbard status
 * @apiName Update Partner Onbard Status
 * @apiGroup Partner
 *
 * @apiBody {String} [userId] 1234
 * @apiBody {String} [status] only PENDING, REJECT, APPROVE are allowed
 * @apiBody {String} [remark] remark on partner
 * @apiBody {Object} [reject_list] remark with key {		"1":"last name is not available"	}
 */
router.post('/update-onboard-status', partnerOnboardCtrl.updatePartnersStatus);

/**
 * @api {POST} /api/v1/partner/fetch-data Fetch partner data
 * @apiName Fetch partner data
 * @apiGroup Partner
 *
 * @apiBody {String} [userId] 1234
 * 
 */
router.post('/fetch-data', partnerOnboardCtrl.fetchPartnerData);


module.exports = router;
