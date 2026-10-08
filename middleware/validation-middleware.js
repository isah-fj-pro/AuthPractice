 
const joi = require('joi');

 function validation(schema){
     return (req,res,next)=>{
        const {error} = schema.validate(req.body, {abortEarly: false});
        if(error){
            return res.status(400).json({
                success: false,
                error: error.details[0].message
            })

        }
         next();
     }
 }
 module.exports = {validation};