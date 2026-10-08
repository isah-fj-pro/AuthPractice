class ApiError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        this.name = 'Api error'

    }
}

const anyncHandeler = (fn)=>(req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(next());
}

const globalErrorHandler = (err,req,res,next)=>{
    if(err instanceof ApiError){
        return res.status(err.statusCode).jsoo({
            message: err.message  
        })
    }
}