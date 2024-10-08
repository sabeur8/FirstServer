const express = require('express');

const db = require('./config/connect')
const User = require('./models/User')

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


app.listen(port,()=>{
    console.log('server works successfully')
})
