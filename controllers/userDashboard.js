const moment = require("moment-timezone")
const pgUserModel = require("../models/pg.user.model")
const pgPartnerModel = require("../models/pg.partner.model")
const { responseDeliver } = require("../services/static.service")
const jwt = require('jsonwebtoken');
const { use } = require("../routes");

exports.userDashboard = (req, res) => {
    let { latitude, longitude, authorization } = req.body
    pgUserModel.fetchDataUserDashboard().then((userData) => {

        // console.log("userData", userData);
        if (userData) {
            res.status(200).json({ status: 0, message: "Dashboard Data Fetched ", data: userData.data })
        }
        else {
            res.status(400).json({ status: 1, message: "Something Went Wrong" })
        }
        // res.status(200).json({ status: 0, message: "Dashboard Data Fetched ", data: { email: userRecord.email, displayName: userRecord.displayName } })

    }).catch((error) => {
        res.status(400).json({ status: 1, message: "Error While Accessing Dashboard Data ", Error: error })
    })

}

