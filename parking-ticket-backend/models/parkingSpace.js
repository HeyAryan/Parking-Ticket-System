const Sequelize = require('sequelize');

const db = require('../utils/database')

const parkingSpace = db.define('parkingSpace',{
    id:{
        type:Sequelize.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    address:{
        type:Sequelize.STRING
    },
    price:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
    status:{
        type:Sequelize.STRING,
        allowNull:false
    }

})

module.exports = parkingSpace