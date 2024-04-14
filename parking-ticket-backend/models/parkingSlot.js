const Sequelize = require('sequelize');

const db = require('../utils/database')

const parkingSlot = db.define('parkingSlot',{
    id:{
        type:Sequelize.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    slotId:{
        type:Sequelize.STRING,
        allowNull:false
    },
    parkingSpaceId:{
        type:Sequelize.BIGINT
    },
    isBooked:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    status:{
        type:Sequelize.STRING,
        allowNull:false
    },
    vehicleType:{
        type:Sequelize.STRING,
        allowNull:false
    }

})

module.exports = parkingSlot