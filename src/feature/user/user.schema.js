import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    assets:[
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:"asset" 
        }
    ]
})

const userModel = mongoose.model("user",userSchema)

export default userModel