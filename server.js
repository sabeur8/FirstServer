const express = require('express');
const userRoute = require('./routes/userRoutes')
const productRoute = require('./routes/productRoutes')



const app = express()
const port = 3000

app.use(express.json())
app.use('/users', userRoute)
app.use('/products', productRoute)








app.listen(port,()=>{
    console.log('server works successfully')
})
