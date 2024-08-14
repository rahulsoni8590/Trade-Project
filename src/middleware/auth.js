import JWT from "jsonwebtoken"
import { CustomError } from "./error.js";

const jwtAuth = function(req,res,next){
    const token = req.cookies.token;
    if(!token){
        next(new CustomError("404", "Token not found"))
    }else{
        try{
            const payload = JWT.verify(token, "@WpuH8)~6ahJvk#");
            req.userid = payload.userid;
            req.username = payload.username;
            next()
        }catch(err){
            next(new CustomError(404, "Token Error"))
        }   
    }
}

export default jwtAuth;