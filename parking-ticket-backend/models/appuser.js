const Sequelize = require('sequelize');

const db = require('../utils/database')

const appuser = db.define('appusers',{
    contact:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    userName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    role:{
        type:Sequelize.STRING,
        allowNull:false
    },

})

module.exports = appuser