const cloudinary=require('../config/cloudinary')


const uploadToCloudinary=async(filePath)=>{
    try {
        const result=cloudinary.uploader.upload(filePath);
        return{
            url:result.secure_url,
            publicId:result.publicId
        }
        
    } catch (error) {
        console.log(" while uploading to cloudinary",error)
        throw new Error("while uploading to cloudinary")
        
    }

}

module.exports={
    uploadToCloudinary
}