
// const jwt=require('jsonwebtoken')

// const authMiddleware=(req , res,next)=>{
//     const authHeader=req.headers['authorization']
    
//     //now we have to split the token and the Bearer
//     const token=authHeader && authHeader.split(" ")[1];
    
//     if(!token){
//         return res.status(404).json({
//             success:false,
//             message:" acess denied not token provided please login to continue"
//         })
//     }

//     //now we have to decode this token 
//     try {
//         const decodedTokenInfo=jwt.verify(token,process.env.JWT_SECRET_KEY)
//         console.log(decodedTokenInfo)

//         req.userInfo=decodedTokenInfo

//         next()
        
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:" acess denied not token provided please login to continue"
//         })
        
//     }
    

// }

// module.exports=authMiddleware







const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log("Authorization Header:", authHeader);

  const token = authHeader?.startsWith("Bearer ") 
    ? authHeader.split(" ")[1] 
    : authHeader;

    console.log(token)

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided. Please login to continue."
    });
  }

  try {
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded Token:", decodedTokenInfo);

    req.userInfo = decodedTokenInfo;
    next();
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please login again."
    });
  }
};

module.exports = authMiddleware;
