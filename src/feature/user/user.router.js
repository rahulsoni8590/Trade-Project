import express from "express"
import UserController from "./user.controller.js";

const userRouter = express.Router();
const usercontoller = new UserController();

// userRouter.get("/users/:id/assets", usercontoller.getuserasset)

userRouter.post("/signup", (req, res, next) => {
    usercontoller.signup(req, res, next)
})
userRouter.post("/login", (req, res, next) => {
    usercontoller.login(req, res, next)
})

export default userRouter;