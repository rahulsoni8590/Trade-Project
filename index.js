import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./src/feature/user/user.router.js"
import assetRouter from "./src/feature/assets/asset.router.js"
import marketRouter from "./src/feature/marketPlace/market.router.js"
import { errorHandler } from "./src/middleware/error.js";
import getClient from "./src/dbconfig.js/mongoconfig.js";
import jwtAuth from "./src/middleware/auth.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use("/auth", userRouter)

app.use("/assets",jwtAuth, assetRouter)

app.use("/users",jwtAuth, assetRouter)

app.use("/",jwtAuth, marketRouter)


app.use(errorHandler)

app.listen(3000, ()=>{
    console.log("App running on 3000")
    getClient()
})
