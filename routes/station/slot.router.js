const express = require("express")
const slotController = require("../../controllers/station/slot.controller")
const router = express.Router()

router.post("/update-slot",slotController.updateSlot)
router.post("/add-slot",slotController.insertSlot)
router.get("/slot",slotController.getSlotById)
router.post("/delete-slot",slotController.deleteSlot)
router.get("/slot-by-station",slotController.getSlotByStationId)

router.post("/slot-timeline",slotController.getSlotById)


module.exports = router;