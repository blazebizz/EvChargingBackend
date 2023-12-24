var express = require('express');
const authCtrl = require('../controllers/auth.controller');
const partnerOnboardCtrl = require('../controllers/partnerOnboard.controller');
var router = express.Router();


/**
 * @api {POST} /api/v1/auth/signup-email User Signup
 * @apiName User Signup
 * @apiGroup Auth
 *
 * @apiBody {String} [email]
 * @apiBody {String} [password]
 * @apiBody {String} [name]
 *
 * @apiSuccessExample {json} Success-Response:
 * 
 * HTTP/1.1 200 OK
 * {
 *   status: 1,
 *   "message": "user created successfully",
 *   "data": {
 * 		"email": "test1@yopmail.com",
 * 		"displayName": "test"
 *    }
 * }
 * 
* @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 400 ERROR
 * {
 *   status: 0,
 *   message: "The email address is already in use by another account."
 * }
 */

router.post('/signup-email', authCtrl.signupWithEmail);

/**
 * @api {POST} /api/v1/auth/login-email Login user
 * @apiName User Login
 * @apiGroup Auth
 *
 * @apiBody {String} [email]
 * @apiBody {String} [password]
 * 
 * @apiSuccessExample {json} Success-Response:
 * 
 * HTTP/1.1 200 OK
 * {
 *   status: 1,
 *   "message": "user login successfully",
 *   "data": ""
 * }
 *
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 400 ERROR
 * {
 *   status: 0,
 *   message: "The password is invalid or the user does not have a password."
 * }
 */
router.post('/login-email', authCtrl.loginWithEmail);

module.exports = router;
