import express from "express"
import MarketController from "./market.controller.js";

const marketRouter = express.Router();
const marketController = new MarketController()


// list of all the published assests
marketRouter.get("/marketplace/assets", (req, res, next) => {
    marketController.listAssets(req, res, next)
})

// buy asset [assetid] ie send new proposal
marketRouter.post("/assets/:id/request", (req, res, next) => {
    marketController.buyAsset(req, res, next)
})

// accept asset proposal [proposalid]
marketRouter.put("/assets/:id/accept", (req, res, next) => {
    marketController.acceptPurchase(req, res, next)
})

//deny asset proposal [proposalid]
marketRouter.put("/assets/:id/deny", (req, res, next) => {
    marketController.denyPurchase(req, res, next)
})

//negotiate on proposal
marketRouter.put("/assets/:id/negotiate", (req, res, next) => {
    marketController.negotiate(req, res, next)
})

//get the user purchase request [proposalid]
marketRouter.get("/users/:id/requests", (req, res, next) => {
    marketController.getPurchaseRequest(req, res, next)
})



export default marketRouter;