const slotModel = require("../../models/station/slot.model")
const {responseCode, responseDeliver} = require("../../services/static.service");

exports.getSlotByStationId = (req, res) => {
    let {station_id} = req.body;
    console.log("req body ", req.body);
    slotModel.getSlotByStationId({
        station_id
    }).then(response => {
        if (response.status === responseCode.SUCCESS) {
            res.status(200).json(response);
        } else {
            console.log("Error while getting data , UserID : ", "userID")
            res.status(400).json({
                status: responseCode.FAIL, message: "Something Went wrong,Please try again"
            });
        }
    }).catch(error => {
        res.status(400).json(responseDeliver(responseCode.INTERNAL_ERROR, "Something Went wrong,Please try again", error));
    })
}

exports.getSlotById = (req, res) => {
    let {slot_id} = req.body;
    console.log("req body ", req.body);
    slotModel.getSlotById({
        slot_id
    }).then(response => {
        if (response.status === 1) {
            console.log("get slot by id ====>",response)
            res.status(200).json(response);
        } else {
            console.log("Error while getting data , UserID : ", "userID")
            res.status(400).json({
                status: responseCode.FAIL, message: "Something Went wrong,Please try again"
            });
        }
    }).catch(error => {
        res.status(400).json(responseDeliver(responseCode.INTERNAL_ERROR, "Something Went wrong,Please try again", error));
    })
}

exports.insertSlot = (req, res) => {
    let {station_id, type, time_line} = req.body;
    console.log("insert slot ", req.body);
    slotModel.insertSlot({
        station_id,
        type,
        time_line
    }).then(response => {
        if (response.status === responseCode.SUCCESS) {
            res.status(200).json(response);
        } else {
            console.log("inserting slot failed");
            res.status(400).json(responseDeliver(400, "Slot insertion failed"))
        }
    }).catch(e => {
        res.status(400).json(responseDeliver(responseCode.INTERNAL_ERROR, "Something Went wrong,Please try again", e));
    });
}

exports.updateSlot = (req, res) => {
    let {slot_id, type, time_line} = req.body;
    console.log("insert slot ", req.body);
    slotModel.updateSlotById({
        slot_id,
        type,
        time_line
    }).then(response => {
        if (response.status === responseCode.SUCCESS) {
            res.status(200).json(response);
        } else {
            console.log("updating slot failed");
            res.status(400).json(responseDeliver(400, "Slot update failed"))
        }
    }).catch(e => {
        res.status(400).json(responseDeliver(responseCode.INTERNAL_ERROR, "Something Went wrong,Please try again", e));
    });
}

exports.deleteSlot = (req, res) => {
    let {slot_id} = req.body;
    console.log("delete slot ", req.body);
    slotModel.deleteSlot({
        slot_id
    }).then(response => {
        if (response.status === responseCode.SUCCESS) {
            res.status(200).json(response);
        } else {
            console.log("inserting slot failed");
            res.status(400).json(response)
        }
    }).catch(e => {
        res.status(400).json(responseDeliver(responseCode.INTERNAL_ERROR, "Something Went wrong,Please try again", e));
    });
}