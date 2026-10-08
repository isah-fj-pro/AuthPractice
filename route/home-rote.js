const express = require("express");
const authMiddle = require('../middleware/auth-middleware')
const route = express.Router();


route.get("/user-home", authMiddle, (req,res)=>{
    const {username,userId, role} = req.userInfo;
    res.json({
        message: 'welcome to home page',
        user: {
            _id: userId,
            _username: username,
           _role: role
        }


    })

})

module.exports = route