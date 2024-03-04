const {pgClient} = require("../../cred/pg.connection");
const {pgTables} = require("../../cred/env");
const {responseDeliver, responseCode,handelErrorResponse} = require("../../services/static.service");


exports.getSlotByStationId = (data) => {
    console.log("getStationByCode request: ", data);
    let {
        station_id
    } = data
    return new Promise(async (resolve, reject) => {

        try {
            let result = await pgClient(pgTables.slot)
                .where({station_id})
            console.log("getSlotByStationId response: ", result);
            return resolve(responseDeliver(responseCode.SUCCESS, "Station Slot Fetch Successfully !", "", result));
        } catch (e) {

            handelErrorResponse(reject,e,"Error getting slot data")

            // console.log("getting error --->" + e);
            // if(e.code === "ENOTFOUND"){
            //     return reject(responseDeliver(responseCode.INTERNAL_ERROR, "unable to connect the database", e));
            // }
            // return reject(responseDeliver(responseCode.FAIL, "error on getting station slot data", e));
        }
    });
}



exports.getSlotById = (data) => {
    console.log("getStationByCode request: ", data);
    let {
        slot_id
    } = data
    return new Promise(async (resolve, reject) => {
        try {
            let result = await pgClient(pgTables.slot)
                .where({slot_id})
            console.log("getSlotById response: ", result);
            return resolve(responseDeliver(responseCode.SUCCESS, "Station Slot Fetch Successfully !", "", result));
        } catch (e) {
            handelErrorResponse(reject,e,"Error getting slot data")

            // console.log("getting error --->" + e);
            // return reject(responseDeliver(responseCode.FAIL, "error on getting station slot data", e));
        }
    });
}

exports.insertSlot = (data) => {
    console.log("getStationByCode request: ", data);
    let {
        station_id,
        type,
        time_line
    } = data
    return new Promise(async (resolve, reject) => {
        try {
            pgClient(pgTables.slot)
                .insert({station_id, type,time_line})
                .returning("slot_id")
                .then(response => {
                return resolve(responseDeliver(responseCode.SUCCESS, "Station Slot Inserted Successfully !", "",response[0]));
            });
        } catch (e) {
            handelErrorResponse(reject,e,"Error getting slot data")

            // console.log("getting error --->" + e);
            // return reject(responseDeliver(responseCode.FAIL, "error on getting station slot data", e));
        }
    });
}

exports.updateSlotById = (data) => {
    console.log("getStationByCode request: ", data);
    let {
        slot_id,
        type,
        time_line
    } = data
    return new Promise(async (resolve, reject) => {
        try {
            pgClient(pgTables.slot)
                .where(slot_id)
                .update({ type,time_line}).then(() => {
                return resolve(responseDeliver(responseCode.SUCCESS, "Station Slot Updated Successfully !", ""));
            });
        } catch (e) {
            handelErrorResponse(reject,e,"Error updating slot data")

            // console.log("getting error --->" + e);
            // return reject(responseDeliver(responseCode.FAIL, "error on updating station slot data", e));
        }
    });
}


exports.deleteSlot = (data) => {
    console.log("getStationByCode request: ", data);
    let {slot_id} = data
    return new Promise(async (resolve, reject) => {
        try {
            pgClient(pgTables.slot)
                .where({slot_id})
                .del().then((deletedItem) => {
                    if (deletedItem===0){
                        return resolve(responseDeliver(responseCode.FAIL, "No matching slot found!", ""));
                    }else{
                        return resolve(responseDeliver(responseCode.SUCCESS, "Station Slot Deleted Successfully !", ""));
                    }
            })
        } catch (e) {
            handelErrorResponse(reject,e,"Error deleting slot data")

            // console.log("getting error --->" + e);
            // return reject(responseDeliver(responseCode.INTERNAL_ERROR, "error on deleting station slot data", e));
        }
    });
}
