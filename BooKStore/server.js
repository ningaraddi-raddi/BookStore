
require("dotenv").config()
const express=require('express')
const connectToDb=require('./database/db')
const bookRoutes=require('./routes/book-routes')
const app=express()

port=process.env.PORT||3000

//connect to databse
connectToDb();




//middleware here we use express.JSON() middle ware
app.use(express.json());

//routes
app.use('/api/books',bookRoutes)


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
});

