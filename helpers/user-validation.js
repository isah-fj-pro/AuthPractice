 const joi = require('joi');

 const registerSchema = joi.object({
    username: joi.string().trim().required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).max(5).required()
                   
 },)

 module.exports = {registerSchema}