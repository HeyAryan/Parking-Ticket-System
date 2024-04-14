const Sequelize = require('sequelize')

const sequelize = new Sequelize(
	'parking', 
	'root', //username
	'root', { //password
		dialect: 'mysql',
		host: 'localhost'
	}
);

module.exports = sequelize