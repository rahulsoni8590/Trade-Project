import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./src/feature/user/user.router.js"
import assetRouter from "./src/feature/assets/asset.router.js"
// import marketRouter from "./src/feature/marketPlace/market.router.js"
import { errorHandler } from "./src/middleware/error.js";
import getClient from "./src/dbconfig.js/mongoconfig.js";
import jwtAuth from "./src/middleware/auth.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

// app.get("/hello", (req,res)=>{
//     console.log("get")
//     res.send("hellow")
// })

// app.use("/",jwtAuth, marketRouter)

app.use("/auth", userRouter)

app.use("/assets",jwtAuth, assetRouter)


app.use(errorHandler)

app.listen(3000, ()=>{
    console.log("App running on 3000")
    getClient()
})

//   /*  Test successful signup and login.
// - Test error handling for duplicate username or invalid credentials.
    
//     Test creating an asset (both draft and published).
//     - Test listing an asset on the marketplace.
//     - Test retrieving asset details.
//     - Test retrieving user's assets.

//     Test retrieving assets on the marketplace.
// - Test creating a purchase request.
// - Test negotiating a purchase request.
// - Test accepting a purchase request.
// - Test denying a purchase request.
// - Test retrieving user's purchase requests.*/