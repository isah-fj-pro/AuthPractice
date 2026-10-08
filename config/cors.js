const cors = require('cors');

const configureCors = ()=>{
    return cors({
        origin:(origin,callback)=>{
            const allowOrigin = [
                'http://localhost:5173'
            ]
            if(!origin || allowOrigin.indexOf(origin) !== -1){
                callback(null,true)
            }else{
                callback(new Error('not allow by cores'))
            }
        },
        methods: ['POST','GET'],
        allowedHeaders:[
            'Content-type',
            'Authorization',
            'Accept-version'
        ],
        credentials: true,

    })

}

module.exports = {
    configureCors

}