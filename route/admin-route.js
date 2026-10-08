const express = require('express');
const authMiddle = require('../middleware/auth-middleware');
const adminAuthMiddle = require('../middleware/admin-middleware');


const route = express.Router();

route.get('/admin',authMiddle,adminAuthMiddle,(req,res)=>{
    
    res.json({
        messsage: `welcome admin ${req.userInfo.username}`
        
    })
})

module.exports = route
