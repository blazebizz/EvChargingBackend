const {pgTables} = require("../../cred/env");
const {pgClient} = require("../../cred/pg.connection");
const {responseDeliver, responseCode} = require("../../services/static.service");


exports.directCreateChargingStation = (reqData) => {
    console.log("REQDATA :", reqData);
    let {
        user_id,
        lat,
        long,
        station_name,
        station_address,
        des,
    } = reqData

    return new Promise(async (resolve, reject) => {
        try {
            let result = await pgClient(pgTables.chargingStation)
                .insert({
                    user_id,
                    lat,
                    long,
                    station_name,
                    station_address,
                    des,
                }).returning(["station_id","station_code"])

            return resolve(responseDeliver(responseCode.SUCCESS, "Charging station data saved successfully", "", result[0]))
        } catch (error) {
            console.log("insert error --->" + error);
            return reject(responseDeliver(responseCode.FAIL, "error on insert charging station data", error))
        }
    })
}

exports.insertChargingStation = (data) => {
    console.log("createChargingStation request: ", data);

    let {
        user_id,
        lat,
        long,
        station_name,
        station_address,
        des,
        station_images,
        station_code,
        opening_time,
        closing_time
    } = data

    return new Promise(async (resolve, reject) => {
        try {
            let result = await pgClient(pgTables.chargingStation)
                .insert({
                    user_id,
                    lat,
                    long,
                    station_name,
                    station_address,
                    des,
                    station_images,
                    station_code,
                    opening_time,
                    closing_time
                }).returning(["station_id","station_code"])
            console.log("createChargingStation response: ", result[0]);

            return resolve(responseDeliver(responseCode.SUCCESS, "Station Created Successfully !", "", result[0]))

        } catch (error) {
            console.log("insert error --->" + error);
            return reject(responseDeliver(responseCode.FAIL, "error on insert charging station data", error))
        }
    })
}

exports.updateChargingStation = (data) => {
    console.log("createChargingStation request: ", data);

    let {
        station_id,
        lat,
        long,
        station_name,
        station_address,
        des,
        station_images,
        opening_time,
        closing_time
    } = data

    return new Promise(async (resolve, reject) => {
        try {
            let result = await pgClient(pgTables.chargingStation)
                .where({ station_id })
                .update({
                    lat,
                    long,
                    station_name,
                    station_address,
                    des,
                    station_images,
                    opening_time,
                    closing_time
                }).returning(["user_id","station_code","station_name"])
            console.log("createChargingStation response: ", result[0]);

            return resolve(responseDeliver(responseCode.SUCCESS, "Station Updated Successfully !", "", result[0]))

        } catch (error) {
            console.log("insert error --->" + error);
            return reject(responseDeliver(responseCode.FAIL, "error on updating charging station data", error))
        }
    })
}

exports.getStationByCode=(data)=>{
    console.log("getStationByCode request: ", data);
    let {
        station_code
    }=data;


    return new Promise(async (resolve, reject) => {
        try {
            let result = await pgClient(pgTables.chargingStation)
                .where({station_code});

            console.log("getStationByCode response: ", result);

            return resolve(responseDeliver(responseCode.SUCCESS, "Station Fetch Successfully !", "", result));

        }catch (e) {
            console.log("getting error --->" + e);
            return reject(responseDeliver(responseCode.FAIL, "error on getting charging station data", e));

        }
    })

}

exports.getStationByUser=(data)=>{
    console.log("getStationByCode request: ", data);
    let {
        user_id
    }=data
    return new Promise(async (resolve, reject) => {
        try {
            let result = await pgClient(pgTables.chargingStation)
                .where({user_id})

            console.log("getStationByUser response: ", result);

            return resolve(responseDeliver(responseCode.SUCCESS, "Station Fetch Successfully !", "", result))

        }catch (e) {
            console.log("getting error --->" + e);
            return reject(responseDeliver(responseCode.FAIL, "error on getting charging station data", e));
        }
    });
}

exports.getStationById=(data)=>{
    console.log("getStationByCode request: ", data);
    let {
        station_id
    }=data
    return new Promise(async (resolve, reject) => {
        try {
            let result = await pgClient(pgTables.chargingStation)
                .where({station_id})

            console.log("getStationByUser response: ", result);

            return resolve(responseDeliver(responseCode.SUCCESS, "Station Fetch Successfully !", "", result))

        }catch (e) {
            console.log("getting error --->" + e);
            return reject(responseDeliver(responseCode.FAIL, "error on getting charging station data", e));
        }
    });
}

exports.getStation=(data)=>{
    console.log("getStationByCode request: ", data);
    let {
        lat,
        long
    }=data

    return new Promise(async (resolve, reject) => {
        try {
            pgClient(pgTables.chargingStation)
                .select("lat","long","station_name","station_id","des").then(data=>{
                console.log("getStation response: ", data);
                return resolve(responseDeliver(responseCode.SUCCESS, "Station Fetch Successfully !", "", data));
            });
        }catch (e) {
            console.log("getting error --->" + e);
            return reject(responseDeliver(responseCode.FAIL, "error on getting charging station data", e));
        }
    });
}

exports.deleteStationById = (data) => {
    console.log("deleteStationById request: ", data);
    let {
        station_id
    } = data;

    return new Promise(async (resolve, reject) => {
        try {
            // Use Knex.js to delete the station from the database
            await pgClient(pgTables.chargingStation)
                .where({ station_id })
                .del();

            console.log("deleteStationById response: Station deleted successfully");

            return resolve(responseDeliver(responseCode.SUCCESS, "Station deleted successfully", ""));
        } catch (error) {
            console.log("Error deleting station: ", error);
            return reject(responseDeliver(responseCode.FAIL, "Error deleting station", error));
        }
    });
}


