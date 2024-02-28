const {pgClient} = require("../../cred/pg.connection");
const {pgTables} = require("../../cred/env");
const {responseDeliver} = require("../../services/static.service");
// const moment = require("moment-timezone");


exports.fetchUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataList = await pgClient(pgTables.userData).where({ userId });
            return resolve(responseDeliver(200, "User data fetched successfully", "", dataList));
        } catch (error) {
            return reject(responseDeliver(400, "error on fetch partner data", error));
        }
    });
};

exports.createUser = (userId, mobileNo, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("table name :", pgTables.userData);
            console.log("data", userId, name, mobileNo);
            console.log("type of userId", typeof userId);
            console.log("type of name", typeof name);
            console.log("type of mobileNo", typeof mobileNo);

           /* let created_at = moment()
                .tz("Asia/Kolkata")
                .format("yyyy-MM-DD hh:mm:sZ");*/

            await pgClient(pgTables.userData).insert({
                userId: userId,
                name: name,
                mobileNo: mobileNo,
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
