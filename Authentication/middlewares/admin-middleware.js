

const isAdmin=(req,res,next)=>{
    if(req.userInfo.role!=='Admin'){
        return res.status(404).json({
            message:"access denied! you do not have the Admin previlages"
        })
    }
    next()
}

module.exports=isAdmin