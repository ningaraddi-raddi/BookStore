const express=require('express');
const router=express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware=require('../middlewares/admin-middleware')

//now we have to give 2 layer authentication for the admin because now with one middleware user can also login as the admin
router.get('/welcome',authMiddleware,adminMiddleware,(req,res)=>{
    res.status(200).json({
        message:"welcome to admin page"

    })
})

module.exports=router;