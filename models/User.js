const mysql = require('mysql2')
const {Sequelize , DataTypes} = require('sequelize')

const sequelize = new Sequelize('ant' , 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
} )

const User = sequelize.define('User', {

    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    id:{
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true
    }
})
module.exports = User



