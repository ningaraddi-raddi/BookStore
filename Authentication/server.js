require("dotenv").config()

const express=require('express');
const connectToDB = require("./database/db");
const authRoutes=require('./routes/auth-routes')
const homeRoutes=require('./routes/home-routes');
const adminRoutes =require('./routes/admin-routes')




port=process.env.PORT||3000;

const app=express();

//middleware
app.use(express.json())

//databse
connectToDB()

//router
app.use('/api/auth',authRoutes);
app.use('/api/home',homeRoutes);
app.use('/api/admin',adminRoutes)

app.listen(port,()=>[
    console.log(`server is running at port ${port}`)
])