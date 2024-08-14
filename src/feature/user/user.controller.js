import { CustomError } from "../../middleware/error.js";
import UserRepo from "./user.repository.js";
import JWT from "jsonwebtoken"

class UserController{
    constructor(){
       this.userRepo = new UserRepo()
    }

    async signup(req,res,next){
        try{
            const {username,password,email} = req.body;
            if(!email || !password || !username){
                return next(new CustomError(400, "Provide Requested Fields"))
            }
            const user = await this.userRepo.findUser(email);
            if(user){ 
                res.status(401).send("User already Registered")
            }else{
                const newUser = await this.userRepo.addUser(username,password,email);
                const {token,cookieOptions} = this.createToken(newUser.username,newUser._id)
                res.status(200).cookie("token", token, cookieOptions).send({
                    signup:"Success",
                    token,
                    expiresIn:cookieOptions.expires
                })
            }
        }catch(err){
            next(err)
        } 
    }

    async login(req,res,next){
        try{
            const {email,password} = req.body;
            console.log(req.body)
            if(!email || !password){
                return next(new CustomError(400, "Provide Requested Fields"))
            }
            const user = await this.userRepo.findUser(email)
            if(user){
                const {token,cookieOptions} = this.createToken(user.username,user._id)
                res.status(200).cookie("token", token, cookieOptions).send({
                    login:"Success",
                    token,
                    expiresIn:cookieOptions.expires
                })
            }else{
                res.status(201).send("User not found")
            }
        }catch(err){
            next(err)
        } 
    }

    createToken(username,userid){
        const token = JWT.sign({username,userid}, "@WpuH8)~6ahJvk#",{expiresIn:"1h"})
        const cookieOptions = {httpOnly:false, expires: new Date(Date.now() + 1*24*60*60*1000)};
        return {token, cookieOptions}
    }
}

export default UserController;