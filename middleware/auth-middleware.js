const jwt = require('jsonwebtoken')

const authMiddleware = (req,res, next)=>{
   const authHeaders = req.headers['authorization'];
   console.log(authHeaders);
   const token = authHeaders && authHeaders.split(" ")[1];

   if(!token ){
    return res.status(401).json({
        success: false,
        message: 'access is denied no token provided '
    })
   }

   // decode the token

   try{
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedToken);
    req.userInfo = decodedToken
     next()
    


   }catch(e){
    return res.status(401).json({
        success: false,
        message: 'access is denied. no is token provided'
    })
   }
   
   
    
}

module.exports = authMiddleware;