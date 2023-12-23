const moment = require("moment-timezone")
const pgUserModel = require("../models/pg.user.model")
const pgPartnerModel = require("../models/pg.partner.model")
const { responseDeliver } = require("../services/static.service")
const jwt = require('jsonwebtoken');
const { use } = require("../routes");

exports.generatetoken = (req, res) => {
    let { userId } = req.body
    pgUserModel.fetchUserData(userId).then((userData) => {
        if (userData.data.length == 0) {
            console.log("Invalid user ID :", userId)
            res.status(400).json({ status: 0, message: "Invalid User ID" })
        } else if (userData.data.length == 1) {
            const tokens = jwt.sign({ userId }, 'my-key', { expiresIn: '20m' });
            console.log(`TokenGenerated : ${userId} ==> Token : ${tokens}`);
            let resp = {
                authorization: tokens,
                name: userData.data[0].name,
                mobileNo: userData.data[0].mobileno,
                userType: userData.data[0].userType
            }
            console.log("response to send==> ", resp)
            res.status(200).json({ status: 0, data: resp })
        }
        else {
            console.log("Something went wrong ")
            res.status(400).json({ status: 0, message: "Something went wrong " })
        }
    })

}


exports.createUser = (req, res) => {
    let { userID, mobileno, name } = req.body
    console.log("req body ", req.body)
    pgUserModel.insertUserData(userID, mobileno, name).then(insertSuccessResp => {
        if (insertSuccessResp.status == 1) {

            const tokens = jwt.sign({ userID }, 'my-key', { expiresIn: '20m' });
            console.log(`TokenGenerated : ${userID} ==> Token : ${tokens}`);
            let resp = {
                authorization: tokens,
                name: name,
                mobileNo: mobileno,
                userType: "customer"
            }
            console.log("response to send==> ", resp)
            res.status(200).json({ status: 0, data: resp })

        }
        else {
            console.log("Error while Inserting data , UserID : ", userID)
            res.status(400).json({ status: 0, message: "Something Went wrong,Please try again" })
        }
    }).catch(err => {

        res.status(400).json({ status: 0, message: "Something Went wrong,Please try again" })

    })

}
