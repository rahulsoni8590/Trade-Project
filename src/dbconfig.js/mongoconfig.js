import mongoose from "mongoose";

const dbName = "trade";

const url = `mongodb://localhost:27017/${dbName}`

export default async function getClient(){
    try{
        await mongoose.connect(url);
        console.log("db Connected")
    }catch(err){
        console.log(err)
        console.log("Monogdb connection failed")
    }
}

