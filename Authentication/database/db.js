const mongoose=require('mongoose');
require('dotenv').config()

const connectToDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully");
        
    } catch (error) {
        console.log(error)
        process.exit(1)
        
    }
}

module.exports=connectToDB;