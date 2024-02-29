const tokenModel = require("../../models/token/token.model")
const jwt = require('jsonwebtoken');
const {responseCode} = require("../../services/static.service");

exports.generateToken = (req, res) => {
    let { userId } = req.body
    tokenModel.fetchUser(userId).then((userData) => {
        if (userData.data.length === 0) {
            console.log("Invalid user ID :", userId)
            res.status(400).json({ status: responseCode.FAIL, message: "Invalid User ID" })
        } else if (userData.data.length === 1) {
            const tokens = jwt.sign({ userId }, 'my-key', { expiresIn: '20m' });
            console.log(`TokenGenerated : ${userId} ==> Token : ${tokens}`);
            let resp = {
                authorization: tokens,
                name: userData.data[0].name,
                mobileNo: userData.data[0].mobileNo,
                userType: userData.data[0].userType
            }
            console.log("response to send==> ", resp)
            res.status(200).json({ status: responseCode.SUCCESS, data: resp })
        } else {
            console.log("Something went wrong ")
            res.status(400).json({ status: responseCode.FAIL, message: "Something went wrong " })
        }
    })
}


exports.createUser = (req, res) => {
    let { userId, mobileNo, name } = req.body
    console.log("req body ", req.body)

    tokenModel.createUser(userId, mobileNo, name)
        .then(insertSuccessResp => {
        if (insertSuccessResp.status === 1) {
            const tokens = jwt.sign({ userId }, 'my-key', { expiresIn: '20m' });
            console.log(`TokenGenerated : ${userId} ==> Token : ${tokens}`);
            let resp = {
                authorization: tokens,
                name: name,
                mobileNo: mobileNo,
                userType: "customer"
            }
            console.log("response to send==> ", resp)
            res.status(200).json({ status: responseCode.SUCCESS, data: resp })

        } else {
            console.log("Error while Inserting data , UserID : ", userId)
            res.status(400).json({ status: responseCode.FAIL, message: "Something Went wrong,Please try again" })
        }
    }).catch(() => {
        res.status(400).json({ status: responseCode.FAIL, message: "Something Went wrong,Please try again" })
    })

}
