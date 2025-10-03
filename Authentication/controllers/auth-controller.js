const User=require('../model/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
require("dotenv").config()
//register controllers
const registerUser=async(req,res)=>{
    try {
        //extract all the info
        const {username,email,password,role}=req.body;
        //check if the user already exist in the database
        const checkExistingUser=await User.findOne({$or :[{username},{email}]});
        if(checkExistingUser){
            res.status(404).json({
                success:true,
                message:"user already exists either with same email or username"
            })
        }
        //we now have to hash the password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)

        //now create the new user
        const newlyCreatedUser=new User({
            username,
            email,
            password:hashedPassword,
            role:role||'user'
        })
        await newlyCreatedUser.save()


        if(newlyCreatedUser){
            res.status(200).json({
                success:true,
                message:"user created successfully",
               
            })
        }
        else{
            
        res.status(400).json({
            success:false,
            message:"something went wrong unable to create user please try again"
        });

        }


        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success:false,
            message:"something went wrong please try again"
        });
        
    }
}




//login controller

const loginUser=async(req,res)=>{

    try {
        //first extract the username and password from the frontend
        const {username,password}=req.body;
        //check if the username exist in the database
        const user=await User.findOne({username});
        if(!user){
            res.status(404).json({
                success:false,
                message:"user do not exist please register to login",
            })
        }
        //if the entered password is correct or not
        const isPasswordMatch=await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            res.status(404).json({
                success:false,
                message:"invalid credentials",
            })

        }
        //create the user token
        const accessToken=jwt.sign({
            userId:user._id,
            username:user.username,
            role:user.role
        },process.env.JWT_SECRET_KEY,{
            expiresIn:'15m'
        });

        res.status(200).json({
            success:true,
            message:"login successfull",
            accessToken
        })
        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success:false,
            message:"something went wrong please try again"
        })
        
    }
}


module.exports={loginUser,registerUser};