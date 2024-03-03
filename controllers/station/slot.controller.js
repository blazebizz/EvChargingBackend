const express = require("express")
const slotModel = require("../../models/station/slot.model")
const {responseCode, responseDeliver} = require("../../services/static.service");

exports.getSlotByStationId = (req, res) => {
    let {station_id} = req.body;
    console.log("req body ", req.body);
    slotModel.getSlotByStationId({
        station_id
    }).then(insertSuccessResp => {
        if (insertSuccessResp.status === 1) {
            res.status(200).json({status: responseCode.SUCCESS, data: insertSuccessResp.data});
        } else {
            console.log("Error while getting data , UserID : ", "userID")
            res.status(400).json({
                status: responseCode.INTERNAL_ERROR, message: "Something Went wrong,Please try again"
            });
        }
    }).catch(() => {
        res.status(400).json({status: responseCode.FAIL, message: "Something Went wrong,Please try again"});
    })
}

exports.insertSlot = (req, res) => {
    let {station_id, type, time_line} = req.body;
    console.log("insert slot ", req.body);
    slotModel.insertSlotByStationId({
        station_id,
        type,
        time_line
    }).then(response => {
        if (response.status === responseCode.SUCCESS) {
            res.status(200).json(responseDeliver(responseCode.SUCCESS, "Slot inserted successfully", "", response.data));
        } else {
            console.log("inserting slot failed");
            res.status(400).json(responseDeliver(400, "Slot insertion failed"))
        }
    }).catch(e => {
        res.status(400).json(responseDeliver(400, "Slot insertion failed", e));
    });
}

exports.deleteSlot = (req, res) => {
    let {slot_id} = req.body;
    console.log("delete slot ", req.body);
    slotModel.deleteSlot({
        slot_id
    }).then(response => {
        if (response.status === responseCode.SUCCESS) {
            res.status(200).json(responseDeliver(responseCode.SUCCESS, "Slot inserted successfully", "", response.data));
        } else {
            console.log("inserting slot failed");
            res.status(400).json(responseDeliver(400, "Slot deletion failed"))
        }
    }).catch(e => {
        res.status(400).json(responseDeliver(400, "Slot deletion failed", e));
    });
}