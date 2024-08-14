import MarketRepo from "./market.repository.js";

export default class MarketController {
    constructor() {
        this.marketRepo = new MarketRepo()
    }

    async listAssets(req, res, next) {
        const assets = await this.marketRepo.listAssets();
        res.status(200).send(assets)
    }

    async buyAsset(req, res, next) {
        try {
            const { proposedPrice } = req.body;
            const assetid = req.params.id
            console.log(assetid)
            const proposal = await this.marketRepo.buyAsset(proposedPrice, req.userid, assetid);
            res.status(200).send({
                message: "Purchase request sent"
            })
        } catch (error) {
            next(error)
        }
    }

    async acceptPurchase(req,res,next){
        try {
            const proposalid = req.params.id
            const purchase = await this.marketRepo.acceptPurchase(proposalid,req.userid);
            res.status(200).send({message: "Request accepted, holder updated"})
        } catch (error) {
            next(error)
        }

    }

    async denyPurchase(req,res,next){
        try {
            const proposalid = req.params.id
            const purchase = await this.marketRepo.denyPurchase(proposalid);
            res.status(200).send({message: "Request denied"})
        } catch (error) {
            next(error)
        }
    }

    async negotiate(req,res,next){
        try {
            const proposalid = req.params.id
            const newPrice = req.body.newProposedPrice
            const purchase = await this.marketRepo.negotiate(proposalid,newPrice);
            res.status(200).send({message: "Negotiation updated"})
        } catch (error) {
            next(error)
        }
    }

    async getPurchaseRequest(req,res,next){
        const id = req.params.id
        const request = await this.marketRepo.getPurchaseRequest(id);
        res.status(200).send(request)
    }
}