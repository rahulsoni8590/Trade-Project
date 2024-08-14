import assetModel from "./asset.schema.js";
import userModel from "../user/user.schema.js";
import marketModel from "../marketPlace/market.schema.js";
import { CustomError } from "../../middleware/error.js";
export default class AssetRepo {

    // Main function to create an asset draft
    async createAssetDraft(name, description, image, status, userid) {
        try {
            const newAsset = await this.createAsset(name, description, image, status);
            const user = await this.updateUserWithAsset(userid, newAsset._id);
            const asset = await this.updateAssetDetails(newAsset._id, user._id);
            return asset;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to create asset draft');
        }
    }

    // function to create a new asset
    async createAsset(name, description, image, status) {
        const newAsset = new assetModel({
            name,
            description,
            image,
            status
        });
        return await newAsset.save();
    }

    // function to update the user with the new asset
    async updateUserWithAsset(userid, assetId) {
        const user = await userModel.findById(userid);
        if (!user) {
            throw new Error('User not found');
        }
        user.assets.push(assetId);
        await user.save();
        return user;
    }


    // function to update the asset details
    async updateAssetDetails(assetId, userId) {
        const asset = await assetModel.findById(assetId);
        if (!asset) {
            throw new Error('Asset not found');
        }
        asset.creator = userId;
        asset.currentHolder = userId;
        asset.tradingJourney[0] = {
            holder: userId,
            date: new Date(),
            price: 100
        };
        await asset.save();
        return asset;
    }

    async listAssetOnMarketplace(assetid, userid) {
        //check if user has that asset
        const asset = await this.checkUserAssets(assetid, userid)
        // update the asset
        if (asset) {
            const updateasset = await this.updateAsset(assetid);
            return updateasset
        }



    }

    async checkUserAssets(assetid, userid) {
        const findUser = await userModel.findById(userid)
        const asset = findUser.assets.includes(assetid);
        console.log("asset", asset)
        if (!asset) {
            throw new CustomError(404, "User asset not found")
        }
        return asset
    }

    async updateAsset(assetid, list = true, userid=null) {
        const asset = await assetModel.findById(assetid);
        if (list) {
            asset.status = "published";
            asset.isListed = true;
            await asset.save();
            await this.listOnMarket(assetid)
        }else{
            const user = await this.checkUserAssets(assetid,userid);
            asset.status = asset.status==="draft"?"published":"draft"
            await asset.save();
        }
        return asset
    }

    async listOnMarket(assetid) {
        const newAssetList = await new marketModel({ assetid }).save();
        return newAssetList
    }

    async getAssetDetail(assetid) {
        const asset = await assetModel.findById(assetid).select('-status');
        if (!asset) {
            throw new CustomError(404, "Asset Not found")
        }
        return asset
    }
}



// async createAssetDraft(name, description, image, status, userid) {
//     try {
//         const newAsset = await new assetModel(name, description, image, status).save();
//         const user = await this.finduser(userid);
//         user.assets.push(new ObjectId(newAsset._id));
//         user.save()
//         console.log(user)
//         const asset = await this.findAsset(newAsset._id);
//         asset.creator = new ObjectId(user._id);
//         asset.currentHolder = new ObjectId(user._id);
//         asset.tradingJourney[0] = {
//             holder: new ObjectId(user._id),
//             date: new Date(Date.now()),
//             price: 100
//         }
//         asset.save()
//         return asset
//     } catch (error) {
//         throw new Error(error)
//     }