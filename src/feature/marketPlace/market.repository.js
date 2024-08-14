import { CustomError } from "../../middleware/error.js";
import assetModel from "../assets/asset.schema.js";
import userModel from "../user/user.schema.js";
import marketModel from "./market.schema.js";
import proposalModel from "./proposal.schema.js";

export default class MarketRepo {
    async listAssets() {
        const assets = await marketModel.find().select("assetid -_id").populate({ path: "assetid", select: "name description image currentHolder price proposals" })
        return assets
    }


    // Function to find an asset by ID
    async findAssetById(assetId) {
        const asset = await assetModel.findById(assetId);
        if (!asset) {
            throw new CustomError(404, "Asset not found");
        }
        return asset;
    }

    // function to create and save a new proposal
    async createProposal(userId, proposedPrice) {
        const newProposal = await new proposalModel({ user: userId, proposedPrice }).save();
        return newProposal;
    }

    // function to update the asset with the new proposal
    async updateAsset(asset, newProposal) {
        asset.proposals += 1; // Or you may want to add newProposal._id to a list of proposals
        await asset.save();
    }

    // function to update the user's proposals
    async updateUserProposals(userId, proposalId) {
        const user = await userModel.findById(userId);
        if (!user) {
            throw new CustomError(404, "User not found");
        }
        user.proposals.push(proposalId);
        await user.save();
    }

    // Main function to buy an asset
    async buyAsset(proposedPrice, userId, assetId) {
        try {
            // Find the asset
            const asset = await this.findAssetById(assetId);

            // Create a new proposal
            const newProposal = await this.createProposal(userId, proposedPrice);

            // Update the asset with the new proposal
            await this.updateAsset(asset, newProposal);

            // Update the user's proposals
            await this.updateUserProposals(asset.creator, newProposal._id);

            return newProposal;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    // update asset based on new holder
    async updateAssetDetails(assetid, price, newholder) {
        const asset = await assetModel.findById(assetid);
        asset.currentHolder = newholder
        asset.tradingJourney.push({
            holder: newholder,
            date: new Date(),
            price
        })
        asset.lastTradingPrice = price
        asset.numberOfTransfers = asset.tradingJourney.length - 1
        asset.averageTradingPrice = (asset.tradingJourney.reduce((acc, curr) => acc + curr.price, 0)) / asset.tradingJourney.length
        await asset.save()
        return asset

    }

    //update the holder
    async updateHolder(assetid, price, newholder, oldholder) {        
        const newHolder = await userModel.findById(newholder)
        newHolder.assets.push(assetid);
        await newHolder.save();
        const oldHolder = await userModel.findById(oldholder)
        oldHolder.assets.pull(assetid);
        await oldHolder.save();
        await this.updateAssetDetails(assetid, price, newholder)

    }


    // accept the proposal
    async acceptPurchase(proposalid, userid) {
        const proposal = await proposalModel.findById(proposalid);
        proposal.status = "accepted";
        await proposal.save()
        console.log(proposal)
        await this.updateHolder(proposal.assetid, proposal.
            proposedPrice
            , proposal.user, userid)
        return proposal;
    }


    //denied purchase
    async denyPurchase(proposalid) {
        const proposal = await proposalModel.findById(proposalid);
        proposal.status = "denied";
        proposal.save()
        return proposal;
    }

    // mark proposal as pending and update the price
    async negotiate(proposalid, newPrice) {
        const proposal = await proposalModel.findById(proposalid);
        proposal.status = "pending";
        proposal.proposedPrice = newPrice;
        await proposal.save()
        console.log(proposal)
        return proposal;
    }

    // mark proposal as pending and update the price
    async negotiate(proposalid, newPrice) {
        const proposal = await proposalModel.findById(proposalid);
        proposal.status = "pending";
        proposal.proposedPrice = newPrice;
        await proposal.save()
        return proposal;
    }

    async getPurchaseRequest(id){
        const proposal = await proposalModel.findById(id).select("-user -__v");
        return proposal;
    }
}