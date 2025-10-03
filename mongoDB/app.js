const mongoose=require('mongoose')

mongoose.connect(
    "mongodb+srv://ningaraddi225_db_user:KaAjaCmMitjmUbX8@cluster0.4ccbqys.mongodb.net/"
)
.
then(()=>console.log("Database connected successfully"))
.
catch((err)=>console.log(err));


const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    isActive:Boolean,
    tags : [String],
    createdAt : {type:Date , default : Date.now}
})




//create user model
const User=mongoose.model('User',userSchema);

async function runQueryExamples() {
    try {
        //creating the new documnet 
        const newUser=await User.create({
            name:'vishal',
            email:'vishal@gmail.com',
            age:22,
            isActive:'false',
            tags : ['Student'],
     

        })

        //like wise we can create user but createuserbfindByIdAndDelete and we cas also update user like below 
        const updateUser=await User.findByIdAndUpdate(newUser._id,{
            $set:{age:100},$pull:{tags:'updated'}
        },{new:true});

        console.log(updateUser)
        //counting the documents with specific property
        const countDocuments=await User.countDocuments({isActive:true})
        console.log(countDocuments)

        //getting all users in sorted order desc
        // const sortedUsers=await User.find().sort({age:-1})
        // console.log(sortedUsers)
        //getting the limited user from the document like get all users except first user in the DB
        // const limitedUsers=await User.find().limit(5).skip(1);
        // console.log("limited users",limitedUsers)

        //getting only the selected property
        // const selectedProperty=await User.find().select('name email -_id')
        // console.log("All Users name and email",selectedProperty)

        //finding the users by there id 
        // const findUserById=await User.findById(newUser._id)
        // console.log("new user by id",findUserById)

        //this will give me the all the users in the DB

        // const allUsers=await User.find({})

        // console.log(allUsers)

        //getting the sppecific users for example isActive is false
        // const statusIsFalse=await User.find({isActive:false});
        // console.log(statusIsFalse);

        
        // another way to create the user other then the await User.create
        // await newUser.save()
        // console.log("databse",newUser);
        
    } catch (error) {
        console.log(error)
        
    }
    finally{
        mongoose.connection.close();
        
    }
    
}




runQueryExamples()


