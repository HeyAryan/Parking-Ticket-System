const parkingSpace = require('../models/parkingSpace')
const parkingSlot = require('../models/parkingSlot')


exports.getParkingSlotDetailsBySlotIdNdSpaceId=(parkingSlotId)=>{
    return new Promise((resolve, reject) => {
        parkingSlot.findOne({
            where:{
                id: parkingSlotId
            }
        })
        .then(slotData => {
            resolve(slotData);
        })
        .catch(error => {
            console.error("Error occurred:", error);
            reject(null);
        })
    })
}

exports.getParkingSpaceDataByParkingSpaceId=(req,res)=>{
    console.log("getParkingSpaceDataByParkingSpaceId called");
    parkingSpace.findOne({
        where:{
            id:req.params.parkingSpaceId
        }
    })
    .then(space=>{
        res.status(200).json({"status":"200","data":space});
    })
    .catch(error => {
        console.log(error)
        res.status(420).send({
            message: error.message,
        })
    })
}

exports.getAllParkingSpace = (req,res)=>{
    console.log("get All Parking Space called");
    parkingSpace.findAll()
        .then(space => {
           res.status(200).json({"status":"200","data":space})
        })
        .catch(error => {
            console.log(error)
            res.status(420).send({
                message: error.message,
            })
        })
}


exports.getAllParkingSlotByParkingSpace = (req,res)=>{
    console.log("getAllParkingSlotByParkingSpace called for :" + req.params.parkingSpaceId);
    parkingSlot.findAll({
        where:{
            parkingSpaceId:req.params.parkingSpaceId,
            status:'ACTIVE'
        }
    })
    .then(parkingSlots => {
        res.status(200).json({"status":"200","data":parkingSlots})
    })
    .catch(error => {
        console.error("Error occurred:", error);
        res.status(420).send({
            message: error.message,
        })
    })
}


exports.addParkingSlot = async (req,res)=>{
    console.log("Add Parking Slot called");
    var parkingSpace = await exports.getParkingSpaceByParkingSpaceId(req.params.parkingSpaceId);
    var totalSlots = await exports.getCountOfSlotByParkingSpaceId(req.params.parkingSpaceId);
    var slotId = parkingSpace.name[0] + "-" + (totalSlots+1);
    let parkingSlotDto = {
        slotId: slotId,
        parkingSpaceId:req.params.parkingSpaceId,
        isBooked:false,
        status:req.body.status,
        vehicleType:req.body.vehicleType
    }

    parkingSlot.create(parkingSlotDto)
    .then(data => {
        console.log(data);
        res.status(200).json("Parking Slot Added Successfully");
    }, error => {
        console.log(error)
        res.status(420).send({
            message: error.message,
        })
    })
}

exports.getCountOfSlotByParkingSpaceId=(parkingSpaceId)=>{
    console.log("getCountOfSlotByParkingSpaceId called for : " + parkingSpaceId);
    return new Promise((resolve, reject) => {
        parkingSlot.count({
            where:{
                parkingSpaceId: parkingSpaceId
            }
        })
        .then(count => {
            resolve(count);
        })
        .catch(error => {
            console.error("Error occurred:", error);
            reject(null);
        })
    })
}

exports.getParkingSpaceByParkingSpaceId=(parkingSpaceId)=>{
    console.log("getParkingSpaceByParkingSpaceId called for : " + parkingSpaceId);
    return new Promise((resolve, reject) => {
        parkingSpace.findOne({
            where: {
                id: parkingSpaceId
            }
        })
        .then(parkingSpace => {
            if (parkingSpace) {
                // console.log("User found:", user);
                resolve(parkingSpace);
            } else {
                console.log("parkingSpace not found");
                resolve(null)
            }
        })
        .catch(error => {
            console.error("Error occurred:", error);
            reject(null);
        })
    })
}

exports.createParkingSpace = (req,res)=>{
    console.log("create Parking Space called");
    let parkingSpaceDto = {
        name:req.body.name,
        address:req.body.address,
        price:req.body.price,
        status:req.body.status
    }

    parkingSpace.create(parkingSpaceDto)
    .then(data => {
        console.log(data);
        res.status(200).json("Parking Space Created Successfully");
    }, error => {
        console.log(error)
        res.status(420).send({
            message: error.message,
        })
    })
}