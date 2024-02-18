const { pgTables } = require("../cred/env");
const { pgclient } = require("../cred/pg.connection");
const { responseDeliver } = require("../services/static.service");
// const KNIX = require("knex")

exports.insertPartnerData = (reqData,updated_at) => {
    console.log("REQDATA :",reqData);
    let { userId,partnerId,city,name,
        state,
        mobileNo,
        pinCode,
        address1,
        address2,
        twoWheeler,
        fourWheeler,
        panNo,
        adharNo,
        ebillNo,
        electricProvider,
        remark,
        bankDetails,
        parkingImage,
        documentImage}=reqData

    return new Promise(async (resolve, reject) => {

        try {
    
            await pgclient(pgTables.partnerOnboard)
                .insert({userId,partnerId,city,name,
                    state,
                    mobileNo,
                    pinCode,
                    address1,
                    address2,
                    twoWheeler,
                    fourWheeler,
                    panNo,
                    adharNo,
                    ebillNo,
                    electricProvider,
                    remark,
                    bankDetails,
                    parkingImage,
                    documentImage,updated_at})

            return resolve(responseDeliver(200, "Partner data saved successfully", ""))

        } catch (error) {
            return reject(responseDeliver(400, "error on insert partner data", error))

        }


    })

}

exports.fetchUserDataDateStatusWise = (status, start_date, end_date) => {

    return new Promise(async (resolve, reject) => {

        try {
            let dataList = await pgclient(pgTables.partnerOnboard)
                .where({ status })
                .where('updated_at', '>=', start_date)
                .where('updated_at', '<=', end_date)

            return resolve(responseDeliver(200, "Partner List fetched successfully", "", dataList))

        } catch (error) {
            return reject(responseDeliver(400, "error on fetch partner list", error))

        }


    })

}

exports.fetchUserData = (userId) => {
    console.log("+++++++++++++++++++++++++++USER ID ",userId);
    
    console.log("+++++++++++++++++++++++++++USER ID ",typeof(userId) );

    return new Promise(async (resolve, reject) => {

        try {
            let dataList = await pgclient(pgTables.partnerOnboard)
                .where({ userId })

            return resolve(responseDeliver(200, "Partner data fetched successfully", "", dataList))

        } catch (error) {
            return reject(responseDeliver(400, "error on fetch partner data", error))

        }


    })

}

exports.updateUserStatus = (userId, status, updated_at, remark, reject_list) => {

    return new Promise(async (resolve, reject) => {

        try {
            let dataList = await pgclient(pgTables.partnerOnboard)
                .where({ userId })
                .update({ status, updated_at, remark, reject_list })

            return resolve(responseDeliver(200, "Partner status updated successfully", "", dataList))

        } catch (error) {
            return reject(responseDeliver(400, "error on update partner status", error))

        }


    })

}


exports.updateUserOnboardData = (userId, onboardData, updated_at) => {

    return new Promise(async (resolve, reject) => {

        try {
            let dataList = await pgclient(pgTables.partnerOnboard)
                .where({ userId })
                .update({ onboardData, updated_at })

            return resolve(responseDeliver(200, "Partner data updated successfully", "", dataList))

        } catch (error) {
            return reject(responseDeliver(400, "error on update partner status", error))

        }


    })

}


exports.insertUserData = (userId, name, mobileNo) => {

    return new Promise(async (resolve, reject) => {

        try {
            console.log("table name :", pgTables.createUser);
            console.log("data", userId, name, mobileNo);
            let created_At = moment().tz("Asia/Kolkata").format("yyyy-MM-DD hh:mm:sZ")
          let ok=  await pgclient(pgTables.createUser)
                .insert({ userId, name, mobileNo, created_At })

            // return resolve(responseDeliver(200, "Partner data saved successfully", ""))

        } catch (error) {
            // return reject(responseDeliver(400, "error on insert partner data", error))
        }


    })

}