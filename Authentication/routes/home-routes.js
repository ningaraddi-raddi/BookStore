const express=require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const router=express.Router()

    router.get('/welcome',authMiddleware,(req,res)=>{
        //if i want to render the info of the user in the frontend
        const {userId,username,role}=req.userInfo
        res.status(200).json({
        message:"welcome to home page ",
        user:{
            
            _id:userId,
            username,
            role,
        }
    })
})

module.exports=router