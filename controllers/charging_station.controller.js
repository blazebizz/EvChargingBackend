const chargingStationModel = require("../models/charging_station.model");

exports.directCreateChargingStation = (req, res) => {
    let {
        partner_id,
        lat,
        long,
        station_name,
        station_address,
        des,
    } = req.body
    console.log("req body ", req.body)
    chargingStationModel.directCreateChargingStation(
        {
            partner_id,
            lat,
            long,
            station_name,
            station_address,
            des
        }
    ).then(insertSuccessResp => {
        if (insertSuccessResp.status === 1) {
            res.status(200).json({status: 0, data: insertSuccessResp.data})
        } else {
            console.log("Error while Inserting data , UserID : ", "userID")
            res.status(400).json({status: 0, message: "Something Went wrong,Please try again"})
        }
    }).catch(() => {
        res.status(400).json({status: 0, message: "Something Went wrong,Please try again"})
    })

}


