 const multer = require('multer');
 const path = require('path');

 const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "uploads/")
    },

    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
 });

 const filterImage = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new Error('only image is allow'),false)
    } 
 }

 module.exports = multer({
    storage: storage,
    fileFilter: filterImage,
    limits:{
        fileSize: 2 * 1024 * 1024 //2mb
    }
 })