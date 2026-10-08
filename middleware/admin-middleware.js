

const isAdminUser = (req,res,next)=>{
    if(req.userInfo.role !== 'admin'){
        return res.json({
            success: false,
           
        })
    }
    next();
}

module.exports = isAdminUser 