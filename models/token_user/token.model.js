const {pgClient} = require("../../cred/pg.connection");
const {pgTables} = require("../../cred/env");
const {responseDeliver, handelErrorResponse, responseCode} = require("../../services/static.service");
// const moment = require("moment-timezone");


exports.fetchUser = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataList = await pgClient(pgTables.users).where({user_id});
            return resolve(responseDeliver(200, "User data fetched successfully", "", dataList));
        } catch (error) {
            return reject(responseDeliver(400, "error on fetch partner data", error));
        }
    });
};

exports.fetchUserByType = (data) => {
    let {
        user_type
    } = data
    return new Promise(async (resolve, reject) => {
        try {
            pgClient(pgTables.users).where({user_type})
                .then(response => {
                    return resolve(responseDeliver(responseCode.SUCCESS, "Station Slot Fetch Successfully !", "", response));
                }).catch(e => {
                handelErrorResponse(reject, e, "Error getting users by type data")
            });
            // let response = pgClient(pgTables.users).where({userType})
            // return resolve(responseDeliver(responseCode.SUCCESS, "Users Fetch Successfully !", "", response));
        } catch (e) {
            handelErrorResponse(reject, e, "Error getting users by type data")

        }
    })
}

exports.createUser = (user_id, mobile_no, name, email) => {
    return new Promise(async (resolve, reject) => {
        try {
            /* let created_at = moment()
                 .tz("Asia/Kolkata")
                 .format("yyyy-MM-DD hh:mm:sZ");*/

            await pgClient(pgTables.users).insert({
                user_id,
                name,
                mobile_no,
                email
            });

            console.log("inserted successfully");

            return resolve(
                responseDeliver(200, "Data Inserted")
            );
        } catch (error) {
            console.log("Error While Inserting data in  db ");
            return reject(responseDeliver(400, "Error while inserting data", error));
        }
    });
};


//todo set pagination mechanism for this
exports.fetchAllUser = () => {
    console.log("calling fetch all user")
    return new Promise(async (resolve, reject) => {
        try {
            pgClient(pgTables.users)
            const response = await pgClient(pgTables.users);
            return resolve(responseDeliver(responseCode.SUCCESS, "Users Fetch Successfully !", "", response));

            // let response = pgClient(pgTables.users).where({userType})
            // return resolve(responseDeliver(responseCode.SUCCESS, "Users Fetch Successfully !", "", response));
        } catch (e) {
            handelErrorResponse(reject, e, "Error getting all users data")
        }
    })
}


exports.changeUserAccess = (data) => {
    console.log("changeUserAccess request ===> ", data);
    let {
        user_id,
        is_allowed
    } = data
    return new Promise(async (resolve, reject) => {
        pgClient(pgTables.users)
            .where({user_id})
            .update({is_allowed})
            .returning("*")
            .then(data => {
                return resolve(responseDeliver(responseCode.SUCCESS, "User Access Updated Successfully !", "", data));
            }).catch(e => {
            handelErrorResponse(reject, e, "Error updating user access")
        });
    });
}