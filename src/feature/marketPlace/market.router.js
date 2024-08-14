import express from "express"

const marketRouter = express.Router();
// 1 to 2 user
// 3 to 6 asset
// 7 user
// 8 to 13 market
marketRouter.get("/marketplace/assets", listassets) // list of all the published assests
marketRouter.post("/assets/:id/request", buyassets) // 
marketRouter.put("/requests/:id/negotiate", negotiate)
marketRouter.put("/requests/:id/accept", accept)
marketRouter.put("/requests/:id/deny", deny)
marketRouter.get("/users/:id/requests", purchaserequest)

export default marketRouter;