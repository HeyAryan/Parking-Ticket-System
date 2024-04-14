const Sequelize = require('sequelize');

const db = require('../utils/database')

const booking = db.define('booking',{
    id:{
        type:Sequelize.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    parkingSlotId:{
        type:Sequelize.BIGINT,
        allowNull:false
    },
    parkingSpaceId:{
        type:Sequelize.BIGINT
    },
    date:{
        type:Sequelize.DATE,
        allowNull:false
    },
    checkInTime:{
        type:Sequelize.BIGINT,
        allowNull:true
    },
    checkOutTime:{
        type:Sequelize.BIGINT,
        allowNull:true
    },
    vehicleType:{
        type:Sequelize.STRING,
        allowNull:false
    },
    userId:{
        type:Sequelize.BIGINT,
        allowNull:false
    },

})

module.exports = booking