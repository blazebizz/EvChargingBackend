const {pgTables} = require("../cred/env");
const {pgClient} = require("../cred/pg.connection");
const {responseDeliver} = require("../services/static.service");


exports.directCreateChargingStation = (reqData) => {
    console.log("REQDATA :", reqData);
    let {
        partner_id,
        lat,
        long,
        station_name,
        station_address,
        des,
    } = reqData

    return new Promise(async (resolve, reject) => {
        try {
            const result = await pgClient(pgTables.chargingStationTable)
                .insert({
                    partner_id,
                    lat,
                    long,
                    station_name,
                    station_address,
                    des,
                }).returning("station_id")

            return resolve(responseDeliver(200, "Charging station data saved successfully", "", result[0]))
        } catch (error) {
            console.log("insert error --->" + error);
            return reject(responseDeliver(400, "error on insert charging station data", error))
        }
    })

}
