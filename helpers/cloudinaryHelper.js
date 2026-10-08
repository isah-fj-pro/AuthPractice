const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (filePath)=>{
    try {

        const {secure_url,public_id} = await cloudinary.uploader.upload(filePath);


        return {
            url: secure_url,
            publlicId: public_id
        }

        
        

        
        
    } catch (error) {
        console.error('error when uploading to cloudinary',error);
        throw new Error('error when uploading to cloudinary')
        
    }

}

module.exports ={
    uploadToCloudinary
}