const moment = require("moment-timezone")
const pgPartnerModel = require("../models/pg.partner.model")
const { responseDeliver } = require("../services/static.service")

exports.partnerOnboard = (req, res) => {

    let { userId, onboardData } = req.body
    let updated_at = moment().tz("Asia/Kolkata").format("yyyy-MM-DD hh:mm:sZ")

    pgPartnerModel.fetchUserData(userId).then(partnerList => {
        if (partnerList.data.length > 0) {

            let new_key = Object.keys(onboardData)
            partnerList.data[0].onboardData[new_key[0]] = onboardData[new_key[0]]

            pgPartnerModel.updateUserOnboardData(userId, partnerList.data[0].onboardData, updated_at).then(insertSuccessResp => {
                res.status(200).json({ status: 1, message: "partner onboard success" })
            }).catch(err => {

                res.status(400).json({ status: 0, message: "partner onboard faild" })

            })
        } else {
            pgPartnerModel.insertPartnerData(onboardData, userId, updated_at, "PENDING").then(insertSuccessResp => {
                res.status(200).json({ status: 1, message: "partner onboard success" })
            }).catch(err => {

                res.status(400).json({ status: 0, message: "partner onboard faild" })

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


    pgPartnerModel.fetchUserDataDateStatusWise(status, startDate, endDate).then(partnerList => {
        res.status(200).json(partnerList)
    }).catch(err => {
        res.status(400).json(err)

    })
}

exports.updatePartnersStatus = async (req, res) => {
    const { userId, status, remark, reject_list } = req.body

    let updated_at = moment().tz("Asia/Kolkata").format("yyyy-MM-DD hh:mm:sZ")

    pgPartnerModel.fetchUserData(userId).then(partnerList => {

        if (partnerList.data.length > 0) {

            pgPartnerModel.updateUserStatus(userId, status, updated_at, remark, reject_list).then(updateResp => {
                res.status(200).json(updateResp)

            }).catch(err => {
                res.status(400).json(err)

            })


        } else {
            res.status(400).json(responseDeliver(400, "Partner record not found"))

        }

    }).catch(err => {
        res.status(400).json(err)

    })
}

exports.fetchPartnerData = async (req, res) => {
    const { userId } = req.body

    pgPartnerModel.fetchUserData(userId).then(partnerData => {
        res.status(200).json(partnerData)
    }).catch(err => {
        res.status(400).json(err)

    })
}