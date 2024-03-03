const chargingStationModel = require("../../models/charging_station/charging_station.model");
const {responseCode, responseDeliver} = require("../../services/static.service");
const {v4: uuidv4} = require('uuid');
const {insertChargingStation} = require("../../models/charging_station/charging_station.model");


exports.directCreateChargingStation = (req, res) => {
    let {
        user_id, lat, long, station_name, station_address, des,
    } = req.body
    console.log("req body ", req.body)
    chargingStationModel.directCreateChargingStation({
        user_id, lat, long, station_name, station_address, des
    }).then(insertSuccessResp => {
        if (insertSuccessResp.status === 1) {
            res.status(200).json({status: responseCode.SUCCESS, data: insertSuccessResp.data})
        } else {
            console.log("Error while Inserting data , UserID : ", "userID")
            res.status(400).json({
                status: responseCode.INTERNAL_ERROR, message: "Something Went wrong,Please try again"
            })
        }
    }).catch(() => {
        res.status(400).json({status: responseCode.FAIL, message: "Something Went wrong,Please try again"})
    })

}

exports.getChargingStationByCode = (req, res) => {
    let {
        station_code
    } = req.body
    console.log("req body ", req.body)
    chargingStationModel.getStationByCode({
        station_code
    }).then(insertSuccessResp => {
        if (insertSuccessResp.status === 1) {
            res.status(200).json({status: responseCode.SUCCESS, data: insertSuccessResp.data})
        } else {
            res.status(400).json({
                status: responseCode.INTERNAL_ERROR, message: "Something Went wrong,Please try again"
            })
        }
    }).catch(() => {
        res.status(400).json({status: responseCode.FAIL, message: "Something Went wrong,Please try again"})
    })

}


exports.getChargingStationByUser = (req, res) => {
    let {
        user_id
    } = req.body
    console.log("req body ", req.body)
    chargingStationModel.getStationByUser({
        user_id
    }).then(insertSuccessResp => {
        if (insertSuccessResp.status === 1) {
            res.status(200).json({status: responseCode.SUCCESS, data: insertSuccessResp.data})
        } else {
            console.log("Error while Inserting data , UserID : ", "userID")
            res.status(400).json({
                status: responseCode.INTERNAL_ERROR, message: "Something Went wrong,Please try again"
            })
        }
    }).catch(() => {
        res.status(400).json({status: responseCode.FAIL, message: "Something Went wrong,Please try again"})
    })

}


exports.getChargingStationById = (req, res) => {
    let {station_id} = req.body
    console.log("req body ", req.body)
    chargingStationModel.getStationById({station_id})
        .then(insertSuccessResp => {
            if (insertSuccessResp.status === 1) {
                res.status(200).json(responseDeliver(responseCode.SUCCESS, "Station fetched successfully", "", insertSuccessResp.data))
            } else {
                console.log("Error while fetching data , station_id : ", station_id)
                res.status(400).json(responseDeliver(responseCode.INTERNAL_ERROR, "Something went wrong, Please try again !"))
            }
        }).catch(() => {
        res.status(400).json(responseDeliver(responseCode.INTERNAL_ERROR, "Something went wrong, Please try again !"))
    })
}


exports.getChargingStations = (req, res) => {
    let {lat, long} = req.body
    console.log("req body ", req.body)
    chargingStationModel.getStation({lat, long})
        .then(insertSuccessResp => {
            if (insertSuccessResp.status === 1) {
                res.status(200).json(responseDeliver(responseCode.SUCCESS, "Data fetched successfully", "", insertSuccessResp.data))
            } else {
                console.log("Error while Inserting data , UserID : ", "userID")
                res.status(400).json(responseDeliver(responseCode.INTERNAL_ERROR, "Something went wrong, Please try again !"))
            }
        }).catch(() => {
        res.status(400).json(responseDeliver(responseCode.INTERNAL_ERROR, "Something went wrong, Please try again !"))
    })

}


//
// exports.createChargingStation = async (req, res) => {
//     try {
//         let {
//             user_id,
//             lat,
//             long,
//             station_name,
//             station_address,
//             des,
//             station_images,
//             opening_time,
//             closing_time,
//         } = req.body;
//
//         let station_code = uuidv4().replace(/-/g, '').substring(0, 7).toUpperCase();
//
//         // while (true) {
//
//
//         // Check if UUID already exists in the database
//         const data = await chargingStationModel.getStationByCode(station_code);
//         console.log("Data returned from getStationByCode:", data);
//         console.log(station_code + " by code: ", data)
//
//
//         //
//         // if (data.data.status === 0) {
//         //     // If UUID doesn't exist, set station_code and break the loop
//         //     break;
//         // }else{
//         //     station_code = uuidv4().replace(/-/g, '').substring(0, 7).toUpperCase(); // Replace '-' and truncate to 7 characters
//         // }
//         // }
//
//         // Insert charging station data into the database
//         /*   const insertSuccessResp = await chargingStationModel.insertChargingStation({
//                user_id,
//                lat,
//                long,
//                station_name,
//                station_address,
//                des,
//                station_images,
//                opening_time,
//                closing_time,
//                station_code,
//            });
//
//            if (insertSuccessResp.status === 1) {
//                res.status(200).json({ status: responseCode.SUCCESS, data: insertSuccessResp.data });
//            } else {
//                console.log("Error while Inserting data, UserID:", user_id);
//                res.status(400).json({ status: responseCode.FAIL, message: "Something went wrong. Please try again." });
//            }*/
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(400).json({status: responseCode.INTERNAL_ERROR, message: "Something went wrong. Please try again."});
//     }
// };
//

exports.createChargingStation = async (req, res) => {
    let {user_id, lat, long, station_name, station_address, des, station_images, opening_time, closing_time} = req.body;

    let station_code = createUUID();
    chargingStationModel.getStationByCode({station_code}).then(code_data => {
        console.log("code_data  ", code_data)
        if (code_data.status === responseCode.SUCCESS && code_data.data.length === 0) {
            // Insert the charging station into the database
            console.log("data not present  ", code_data.data)
            chargingStationModel.insertChargingStation({
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
            }).then(insert_data => {
                if (insert_data.status === responseCode.SUCCESS) {
                    res.status(200).json({
                        status: responseCode.SUCCESS,
                        message: "Charging station created successfully.",
                        data: insert_data.data
                    });
                }
            });
            // Respond with success message
        } else {
            //call the function again
            console.log("station_code exist, recreating")
            this.createChargingStation(req, res)
        }
    })


};

exports.updateChargingStation = async (req, res) => {
    let {
        station_id, lat, long, station_name, station_address, des, station_images, opening_time, closing_time
    } = req.body;

    // Insert the charging station into the database
    chargingStationModel.updateChargingStation({
        station_id, lat, long, station_name, station_address, des, station_images, opening_time, closing_time
    }).then(insert_data => {
        if (insert_data.status === responseCode.SUCCESS) {
            res.status(200).json({
                status: responseCode.SUCCESS, message: "Charging station updated successfully.", data: insert_data.data
            });
        }
    });
    // Respond with success message

};

// Function to create a UUID of length 7
// function createUUID() {
//     return Math.random().toString(36).substring(2, 9).toUpperCase();
// }



