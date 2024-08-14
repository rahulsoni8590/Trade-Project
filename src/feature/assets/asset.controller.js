
import AssetRepo from "./asset.repository.js"

export default class AssetController {
    constructor() {
        this.assetRepo = new AssetRepo()
    }

    async createAssetDraft(req, res, next) {
        try {
            const { name, description, status } = req.body
            const image = req.file.filename;
            const asset = await this.assetRepo.createAssetDraft(name, description, image, status, req.userid)
            console.log(asset)
            res.status(200).send({
                "message": "Asset created successfully",
                "assetId": asset._id
            })
        } catch (err) {
            next(Error("Asset not created"))
        }
    }

    async listAssetOnMarketplace(req, res, next) {
        try {
            const assetid = req.params.id;
            const listedAsset = await this.assetRepo.listAssetOnMarketplace(assetid, req.userid)
            res.status(200).send({
                "message": "Asset published successfully"
            }) 
        } catch (error) {
            next(error)
        }  
    }

    async getAssetDetail(req,res,next){
        try {
            const assetid = req.params.id
            const asset = await this.assetRepo.getAssetDetail(assetid);
            res.status(200).json(
                asset
            )
        } catch (error) {
            next(error)
        }
    }

    async updateAsset(req,res,next){
        try {
            const assetid = req.params.id
            console.log(assetid)
            const asset = await this.assetRepo.updateAsset(assetid,false,req.userid);
            res.status(200).json(
                {
                    "message": "Asset created successfully",
                    "assetId": asset._id
                }
            )
        } catch (error) {
            next(error)
        }
    }
}

// Endpoint: `POST /assets`
// - Request:
// ```json
// {
// "name": "string",
// "description": "string",
// "image": "string",
// "status": "draft" // or "published"
// }
// ```
// - Response:
// ```json
// {
// "message": "Asset created successfully",
// "assetId": "string"
// }
// ``