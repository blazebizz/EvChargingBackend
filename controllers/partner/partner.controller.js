const moment = require("moment-timezone")
const onboardModel = require("../../models/partner/partner.model")
const { responseDeliver, responseCode} = require("../../services/static.service")

exports.partnerOnboard = (req, res) => {
    let reqData = req.body
    console.log("Received onboarding request :",reqData);

    let updated_at = moment().tz("Asia/Kolkata").format("yyyy-MM-DD hh:mm:sZ")

    onboardModel.fetchPartner(req.body.userId).then(data => {

        if (data.data.length > 0) {

            // let new_key = Object.keys(onboardData)
            // partnerList.data[0].onboardData[new_key[0]] = onboardData[new_key[0]]

            res.status(200).json(responseDeliver(responseCode.SUCCESS,"partner already onboarded !"))

            // pgPartnerModel.updateUserOnboardData(userId, partnerList.data[0].onboardData, updated_at).then(insertSuccessResp => {
            //     // res.status(200).json({ status: 1, message: "partner onboard success" })
            // }).catch(err => {

            //     res.status(400).json({ status: 0, message: "partner onboard faild" })

            // })
        } else {
            console.log("Inserting partner data ");
            onboardModel.insertPartner(reqData,updated_at).then(insertSuccessResp => {
                if (insertSuccessResp.code === 1){
                    res.status(200).json(responseDeliver(responseCode.SUCCESS, "partner onboarded successfully !"))
                    // res.status(200).json({ status: response_code.SUCCESS, message: "partner onboard success" })
                }
            }).catch(() => {
                res.status(400).json(responseDeliver(responseCode.FAIL,"partner onboard failed !"))
                // res.status(400).json({ status: response_code.FAIL, message: "partner onboard failed" })
            })

        }
    })
}


exports.fetchPartnersStatusWiseData = async (req, res) => {
    const { status, start_date, end_date } = req.body
    // const startDate = start_date+" 00:00:00+00"
    // const endDate = end_date + " 23:59:59+00"
    const startDate = moment(start_date + " 00:00:00+00", "DD-MM-yyyy HH:mm:ss+00").format("yyyy-MM-DD HH:mm:ss+00")
    const endDate = moment(end_date + " 23:59:59+00", "DD-MM-yyyy HH:mm:ss+00").format("yyyy-MM-DD HH:mm:ss+00")

    onboardModel.fetchUserDataDateStatusWise(status, startDate, endDate).then(partnerList => {
        res.status(200).json(responseDeliver(responseCode.SUCCESS,"partner list fetched ","",partnerList))
    }).catch(err => {
        res.status(400).json(err)
    })
}

exports.updatePartnersStatus = async (req, res) => {
    const { userId, status, remark, reject_list } = req.body

    let updated_at = moment().tz("Asia/Kolkata").format("yyyy-MM-DD hh:mm:sZ")

    onboardModel.fetchPartner(userId).then(partnerList => {
        if (partnerList.data.length > 0) {
            onboardModel.updatePartnerStatus(userId, status, updated_at, remark, reject_list).then(updateResp => {
                res.status(200).json(updateResp)
            }).catch(err => {
                res.status(400).json(err)
            })
        } else {
            res.status(400).json(responseDeliver(responseCode.FAIL, "Partner record not found"))
        }
    }).catch(err => {
        res.status(400).json(err)
    })
}

exports.fetchPartnerData = async (req, res) => {
    const { userId } = req.body

    onboardModel.fetchPartner(userId).then(partnerData => {
        res.status(200).json(partnerData)
    }).catch(err => {
        res.status(400).json(err)

    })
}