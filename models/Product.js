const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize('ant', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})
const Product = sequelize.define('Product',{
    
    id:{
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false
    },
    title:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.NUMBER
    },
    qty:{
        type: DataTypes.NUMBER
    }
},
{
    tableName:'products',
    timestamps: false
}
)
module.exports = Product