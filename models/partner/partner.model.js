const { pgTables } = require("../../cred/env");
const { pgClient } = require("../../cred/pg.connection");
const { responseDeliver } = require("../../services/static.service");

exports.insertPartner = (reqData) => {
    console.log("REQDATA :",reqData);

    let {
        user_id,
        remark,
        bank_details,
        document_images,
        pan_no,
        aadhar_no,
        electric_bill_no,
        electric_provider,
        name,
        city,
        state,
        mobile_no,
        pin_code,
        address_1,
        address_2
    }=reqData



    return new Promise(async (resolve, reject) => {

        try {
    
            await pgClient(pgTables.partner)
                .insert({
                    user_id,
                    remark,
                    bank_details,
                    document_images,
                    pan_no,
                    aadhar_no,
                    electric_bill_no,
                    electric_provider,
                    name,
                    city,
                    state,
                    mobile_no,
                    pin_code,
                    address_1,
                    address_2
                })

            return resolve(responseDeliver(200, "Partner data saved successfully", ""))

        } catch (error) {
            return reject(responseDeliver(400, "error on insert partner data", error))
        }
    })
}



exports.fetchUserDataDateStatusWise = (status, start_date, end_date) => {

    return new Promise(async (resolve, reject) => {

        try {
            let dataList = await pgClient(pgTables.partner)
                .where({ status })
                .where('updated_at', '>=', start_date)
                .where('updated_at', '<=', end_date)

            return resolve(responseDeliver(200, "Partner List fetched successfully", "", dataList))

        } catch (error) {
            return reject(responseDeliver(400, "error on fetch partner list", error))

        }


    })

}

exports.fetchPartner = (userId) => {
    console.log("+++++++++++++++++++++++++++USER ID ",userId);

    console.log("+++++++++++++++++++++++++++USER ID ",typeof(userId) );

    return new Promise(async (resolve, reject) => {
        try {
            let dataList = await pgClient(pgTables.partner)
                .where({ userId })
            return resolve(responseDeliver(200, "Partner data fetched successfully", "", dataList))
        } catch (error) {
            return reject(responseDeliver(400, "error on fetch partner data", error))
        }
    })

}

exports.updatePartnerStatus = (userId, status, updated_at, remark, reject_list) => {

    return new Promise(async (resolve, reject) => {

        try {
            let dataList = await pgClient(pgTables.partnerOnboard)
                .where({ userId })
                .update({ status, updated_at, remark, reject_list })
            return resolve(responseDeliver(200, "Partner status updated successfully", "", dataList))
        } catch (error) {
            return reject(responseDeliver(400, "error on update partner status", error))
        }
    })
}


/*exports.updatePartner = (userId, onboardData, updated_at) => {

    return new Promise(async (resolve, reject) => {

        try {
            let dataList = await pgClient(pgTables.partnerOnboard)
                .where({ userId })
                .update({ onboardData, updated_at })
            return resolve(responseDeliver(200, "Partner data updated successfully", "", dataList))
        } catch (error) {
            return reject(responseDeliver(400, "error on update partner status", error))
        }
    })

}*/




