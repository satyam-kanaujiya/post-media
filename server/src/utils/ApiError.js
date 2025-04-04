class ApiError extends Error{
    constructor(message,statusCode,success="false",stack="")
    {
        super(message);
        this.statusCode = statusCode;
        this.success = success;
        this.stack = stack;

        if(process.env.NODE_ENV==="development"){
            Error.captureStackTrace(this,this.constructor);
        }
    }
};

export {ApiError};