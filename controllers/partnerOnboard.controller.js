const { fetchUserData, insertPartnerData, fetchUserDataDateStatusWise } = require("../models/supabase.model")
const moment = require("moment-timezone")

exports.partnerOnboard = (req, res) => {

    let { userId, onboardData } = req.body
    let updated_at = moment().tz("Asia/Kolkata").format("yyyy-MM-DD hh:mm:sZ")

    insertPartnerData(onboardData, userId, updated_at, "PENDING").then(insertSuccessResp => {
        res.status(200).json({ status: 1, message: "partner onboard success" })
    }).catch(err => {
        
        res.status(400).json({ status: 0, message: "partner onboard faild" })

    })
}

exports.fetchPartnersData = async (req, res) => {
    await fetchUserData()
}

exports.fetchPartnersStatusWiseData = async (req, res) => {
    const { status, start_date, end_date} = req.body

    await fetchUserDataDateStatusWise(status, start_date, end_date)
}