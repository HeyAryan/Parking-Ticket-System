
const booking = require('../models/booking')
const parkingSlot = require('../models/parkingSlot')
const {getParkingSlotDetailsBySlotIdNdSpaceId} = require('../controllers/parkingSpaceController')
const { Op } = require('sequelize');

exports.getBookedSlotByDate = (req,res)=>{
    console.log("getBookedSlotByDate called");
    console.log(req.query.date);
    var date = new Date(req.query.date)
    var endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    booking.findAll({
        where:{
            parkingSpaceId: req.params.parkingSpaceId,
            date:{
                [Op.gte]: date,
                [Op.lte]: endOfDay 
            },
            userId: req.session.user.contact
        }
    })
    .then(bookings => {
        bookings.forEach(booking => {
            if(booking.userId != req.session.user.contact){
                booking.userId = null;
            }
            
        });
        res.status(200).json({"status":"200","data":bookings})
    })
    .catch(error => {
        console.error("Error occurred:", error);
        res.status(420).send({
            message: error.message,
        })
    })
}

exports.getBookingHistoryCountByUserContact = (req,res)=>{
    console.log("getBookingHistoryCountByUserContact called for :");
    if(req.session.user == undefined || req.session.user.contact == undefined){
        res.status(420).send({
            status:"401",
            message: "Unauthorized Access"
        });
        return;
    }
    booking.count({
        where:{
            userId: req.session.user.contact
        }
    })
    .then(count => {
        res.status(200).json({"status":"200","data":count})
    })
    .catch(error => {
        console.error("Error occurred:", error);
        res.status(420).send({
            message: error.message,
        })
    })
}


exports.getBookingHistoryByUserContact=(req,res)=>{
    console.log("getBookingHistoryByUserContact called for :");
    const pageSize = parseInt(req.query.pageSize) || 10;
    const pageNo = parseInt(req.query.pageNo) || 1; 
    const offset = (pageNo - 1) * pageSize;
    if(req.session.user == undefined || req.session.user.contact == undefined){
        res.status(420).send({
            status:"401",
            message: "Unauthorized Access"
        });
        return;
    }
    booking.findAll({
        where:{
            userId:req.session.user.contact
        },
        limit: pageSize,
        offset: offset
    })
    .then(booking => {
        res.status(200).json({"status":"200","data":booking})
    })
    .catch(error => {
        console.error("Error occurred:", error);
        res.status(420).send({
            message: error.message,
        })
    })
}

exports.bookParkingSlot = async (req, res) => {
    console.log("bookParkingSlot called");
    console.log(req.params)
    try {
        if(req.session.user == undefined || req.session.user.contact == undefined){
            res.status(420).send({
                status:"401",
                message: "Unauthorized Access"
            });
            return;
        }
        var parkingSlotIds = req.body.parkingSlotIds;
        const bookings = await Promise.all(parkingSlotIds.map(async slotId => {
            var parkingSlotData = await getParkingSlotDetailsBySlotIdNdSpaceId(slotId);
            var bookingDto = {
                parkingSlotId: slotId,
                parkingSpaceId: req.body.parkingSpaceId,
                date: req.body.date,
                checkInTime: null,
                checkOutTime: null,
                vehicleType: parkingSlotData.vehicleType,
                userId: req.session.user.contact
            };
            console.log(bookingDto);
            await exports.updateParkingSlotStatusBySpaceIdNdSlotId(req.body.parkingSpaceId,slotId,true);
            return booking.create(bookingDto);
        }));
        console.log(bookings);
        res.status(200).json("Parking Slots Booked Successfully");
    } catch (error) {
        console.log(error);
        res.status(420).send({
            message: error.message
        });
    }
};

exports.updateParkingSlotStatusBySpaceIdNdSlotId=async (parkingSpaceId,parkingSlotId,status)=>{
    console.log("updateParkingSlotStatusBySpaceIdNdSlotId called")
    const updatedRows = await parkingSlot.update(
        { isBooked: status },
        { where: { id: parkingSlotId,parkingSpaceId:parkingSpaceId } }
      );
}


