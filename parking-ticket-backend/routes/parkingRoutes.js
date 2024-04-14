const express = require('express')
const router = express.Router();
const {createParkingSpace,getAllParkingSpace,addParkingSlot,getAllParkingSlotByParkingSpace,getParkingSpaceDataByParkingSpaceId} = require('../controllers/parkingSpaceController')
const {bookParkingSlot,getBookingHistoryByUserContact,getBookingHistoryCountByUserContact,getBookedSlotByDate} = require('../controllers/bookingController')


router.post("/space/create",createParkingSpace)
router.get("/space/fetchAll",getAllParkingSpace)
router.post("/slot/:parkingSpaceId/create",addParkingSlot)
router.get("/slot/:parkingSpaceId/fetchAll",getAllParkingSlotByParkingSpace)
router.get("/slot/:parkingSpaceId/fetch",getParkingSpaceDataByParkingSpaceId)

//bookings
router.post("/slot/book",bookParkingSlot)
router.get("/booking/history",getBookingHistoryByUserContact)
router.get("/booking/history/count",getBookingHistoryCountByUserContact)
router.get("/slot/booked/:parkingSpaceId",getBookedSlotByDate)


module.exports=router;