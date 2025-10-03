const mongoose=require('mongoose');

const connectToDb=async()=>{
    try {
        await mongoose.connect("mongodb+srv://ningaraddi225_db_user:ciCWusVWlvLX6pCS@bookstore.gmahdca.mongodb.net/")

        console.log("DB connected successfully")
        
    } catch (error) {
        console.log("Error connecting to the databse",error)
        process.exit(1);
        
    }
    

}

module.exports=connectToDb;