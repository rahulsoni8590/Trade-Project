class CustomError extends Error{
    constructor(status,message){
        super(message);
        this.status = status;
    }
}

const errorHandler = (err,req,res,next)=>{
    console.log(err)
    if(err instanceof CustomError){
        res.status(err.status).send(err.message)
    }else{
        res.status(500).send("Something went wrong")
    }
    next()
}

export {CustomError, errorHandler}