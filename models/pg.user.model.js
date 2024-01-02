const { pgTables } = require("../cred/env");
const { pgclient } = require("../cred/pg.connection");
const { responseDeliver } = require("../services/static.service");
const moment = require("moment-timezone")

exports.insertUserData = (userId, mobileno, name) => {

    return new Promise(async (resolve, reject) => {

        try {
            console.log("table name :", pgTables.createUser);
            console.log("data", userId, name, mobileno);
            console.log("type of userId", typeof (userId));
            console.log("type of name", typeof (name));
            console.log("type of mobileno", typeof (mobileno));

            let created_at = moment().tz("Asia/Kolkata").format("yyyy-MM-DD hh:mm:sZ")
            await pgclient('userData')
                .insert({ "userId": userId, "name": name, "mobileno": mobileno })

            console.log("inserted successfully")

            return resolve({ status: 1, message: "Data Inserted " })

        } catch (error) {
            console.log("Error While Inserting data in  db ");
            return reject({ status: 0, message: "Error while inserting data" })


        }


    })

}

exports.fetchUserData = (userId) => {

    return new Promise(async (resolve, reject) => {

        try {
            let dataList = await pgclient(pgTables.createUser)
                .where({ userId })

            return resolve(responseDeliver(200, "Partner data fetched successfully", "", dataList))

        } catch (error) {
            return reject(responseDeliver(400, "error on fetch partner data", error))

        }


    })

}



exports.fetchDataUserDashboard = () => {

    return new Promise(async (resolve, reject) => {

        try {
            let dataList = await pgclient.from('chargingStationDetails').select('stationId', 'stationName', 'rating', 'ratingCount', 'latitude', 'longitude', 'desc');
            // console.log("dataList ::==> ", dataList);
            return resolve(responseDeliver(200, "Dashboard Data Fetched successfully ", "", dataList))

        } catch (error) {
            return reject(responseDeliver(400, "error While Fetching Dashboard data", error))

        }


    })

}

