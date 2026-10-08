// API VERSIONING

const api = (version)=>(req,res,next)=>{
    if(req.path.startswith(`api/${version}`)){
        next()
    }else{
        res.status(404).json({
            succes:false,
            message: 'api version is not supported'

        })
    }
}