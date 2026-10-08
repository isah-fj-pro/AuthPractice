
const clodinary = require('../config/cloudinary');
const Image = require('../model/Image');


const imageController = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'file is requird'
            })
        }

        const result = await clodinary.uploader.upload(req.file.path);

        const newImage = new Image({
            url: result.secure_url,
            publicId: result.public_id,
            uploadedBy: req.userInfo.userId
        })


        if (newImage) {
            res.status(201).json({
                success: true,
                message: 'image uploaded succesfull',
                data: newImage
            })

        }

        await newImage.save()

    } catch (error) {
        console.error('something went wrong', error);
        res.status(500).json({
            success: false,
            message: 'can not upload image'
        })


    }
}

const getAllImages = async (req, res) => {
    try {

        const allImages = await Image.find({});

        if (allImages) {
            res.status(200).json({
                success: true,
                data: allImages

            })
        }




    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'can not get image try again'

        })



    }
}

const deleteImage = async (req, res) => {
    try {
        const imageId = req.params.id;
        const userId = req.userInfo.userId;

        const image = await Image.findById(imageId);

          if (image.uploadedBy.toString() !== userId) {
            return res.status(400).json({
             success: false,
                message: `you are not authtorige to delete the image`
         })
         }

         await clodinary.uploader.destroy(image.publicId);

        await Image.findByIdAndDelete(imageId);

        res.status(200).json({
            success: true,
            message: `image is deleted`
        })







    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'can not delete image'

        })
    }
}




module.exports = {
    imageController,
    getAllImages,
    deleteImage
}