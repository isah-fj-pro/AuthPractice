 const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const isAdminUser = require('../middleware/admin-middleware');
const uploadImageMiddleware = require('../middleware/uploadImage-middleware');
const {imageController, getAllImages,deleteImage} = require('../controller/image-controller')

 const route = express.Router();

 route.post('/upload',authMiddleware,isAdminUser,uploadImageMiddleware.single('image'), imageController  );
 route.get('/get',authMiddleware,getAllImages);
 route.delete('/:id',authMiddleware,isAdminUser, deleteImage);

 module.exports = route