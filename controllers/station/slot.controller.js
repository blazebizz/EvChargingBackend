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
            res.status(400).json(response);
        }
    }).catch(error => {
        res.status(400).json(error);
    })
}



exports.getSlotById = (req, res) => {
    let {slot_id} = req.body;
    console.log("req body ", req.body);
    slotModel.getSlotById({
        slot_id
    }).then(response => {
        if (response.status === responseCode.SUCCESS) {
            res.status(200).json(response);
        } else {
            res.status(400).json(response);
        }
    }).catch(error => {
        res.status(400).json(error);
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
            res.status(400).json(response);
        }
    }).catch(error => {
        res.status(400).json(error);
    })
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
            res.status(400).json(response);
        }
    }).catch(error => {
        res.status(400).json(error);
    })
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
            res.status(400).json(response);
        }
    }).catch(error => {
        res.status(400).json(error);
    })
}