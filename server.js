const express = require('express');

const db = require('./config/connect')
const User = require('./models/User')
const Product = require('./models/Product')

const app = express()
const port = 3000

app.use(express.json())


app.post('/addU', (req,res)=> {

    const {name, email, id} = req.body ;

    const query = 'INSERT INTO users (name, email, id) VALUES (?, ?, ?)';
    db.query(query, [name, email, id], (err, results) => {
    if (err) {
        return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'User added', id: results.insertId });
});
    })


    app.get('/add/getAll', ()=>{
        console.log('getttttttttt all')
    })

app.get('/users',(req,res)=>{
    db.query('SELECT * FROM users', (err, results) =>{
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Database query error');
        } else {
            console.log('success command sql')
            res.json(results);
        }
    })
})

app.get('/users/:id',(req,res)=>{
    const {id} = req.params
    User.findByPk(id)
    .then((user)=>{
        if(!user){
            return res.status(404).json({message: 'user not found'})
        }
        res.status(200).json(user);
        
    }).catch(error =>{
        res.status(500).json({ error: error.message });
    })
})

app.delete('/user/delete/:id',(req,res) =>{

    const {id} = req.params
    User.findByPk(id)

    .then((deletedUser)=>{
        if(!deletedUser){
            return res.status(404).json({message: "user not found"})
        }
        deletedUser.destroy();
    })
    .then(()=>{
        res.status(200).json({message: "user deleted successfully"})
    })
    .catch(error =>{
        res.status(500).json({error: error.message})
    })
})

app.put('/user/update/:idU',(req,res) => {

    const {idU} = req.params
    const {name, email, id} = req.body

    User.findByPk(idU)
    .then((updatedUser)=>{
        if(!updatedUser){
            console.log("Received ID:", idU);
            return res.status(404).json({message: 'user not found'})
        }

        updatedUser.name = name || updatedUser.name
        updatedUser.email = email || updatedUser.email
        updatedUser.id = id || updatedUser.id

        return updatedUser.save()

    }).then((updatedUser)=>{
        res.status(200).json(updatedUser)
    })
    .catch(error =>{
        res.status(500).json({error: error.message})
    })
})

//create product crud

app.post('/products/add',(req,res)=>{
    const {id, image, title, price, qty} = req.body
    const query = 'INSERT INTO products (id, image, title, price, qty) VALUES (?,?,?,?,?)'
    db.query(query,[id, image, title, price, qty],(err,result) =>{
        if (err){
            return res.status(500).json({error: err.message})
        }
        res.status(200).json({message: 'product added successfully'})
    })
})

app.get('/products/showAll',(req,res)=>{
    const query= 'SELECT * FROM products'
    db.query(query,(err,result)=>{
        if(err){
            res.status(500).json({message: err.message})
        }
        else{
            res.status(200).json(result)
        }
    })
})




app.listen(port,()=>{
    console.log('server works successfully')
})
