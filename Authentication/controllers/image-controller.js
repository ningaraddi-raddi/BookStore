const Imgae=require('../model/image')

const uploadImage=async(req,res)=>{
    try {
        //check if file data missing in the req object 
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"something went wrong file is required! please upload the image "
            })
        }
        
    } catch (error) {
        console.log(error)
        
    }

}