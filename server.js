require("dotenv").config();
const express = require('express');
const cors = require('cors')
const ConnectToDB = require('./dataBase/db');
const authRoutes = require('./route/user-route');
const homeRoute = require('./route/home-rote');
const adminRoute = require('./route/admin-route');
const router = require('./route/image-route');
const { configureCors } = require("./config/cors");


ConnectToDB()
const app = express();

const PORT = process.env.PORT || '3000';
app.use(express.json());
app.use(configureCors())
app.use('/api/auth',authRoutes);
app.use('/api/home',homeRoute);
app.use('/api/admin',adminRoute);
app.use('/api/uploadImage', router);
app.listen(PORT, ()=>{
    console.log('server is runing');
    
})