const Product = require('../models/Product')
const db = require('../config/connect')

exports.createProduct = (req,res)=> {
    const {id, image, title, price, qty} = req.body
    const query = 'INSERT INTO products (id, image, title, price, qty) VALUES (?,?,?,?,?)'
    db.query(query,[id, image, title, price, qty],(err,result) =>{
        if (err){
            return res.status(500).json({error: err.message})
        }
        res.status(200).json({message: 'product added successfully'})
    })
}

exports.getAllProducts = (req,res)=> {
    const query= 'SELECT * FROM products'
    db.query(query,(err,result)=>{
        if(err){
            res.status(500).json({message: err.message})
        }
        else{
            res.status(200).json(result)
        }
    })
}