import express from "express"
import AssetController from "./asset.controller.js";
import fileUpload from "../../middleware/fileupload.js";

const assetRouter = express.Router();
const assetController = new AssetController()


// mark list as true and also publish
assetRouter.put("/:id/publish",(req,res,next)=>{ // add a new asset
    assetController.listAssetOnMarketplace(req,res,next)
})

//get asset details based on id
assetRouter.get("/:id", (req,res,next)=>{ 
    assetController.getAssetDetail(req,res,next)
}) 

// Update the asset detail
assetRouter.post("/:id", (req,res,next)=>{ 
    assetController.updateAsset(req,res,next)
}) 

// add a new asset
assetRouter.post("/", fileUpload.single("image") ,(req,res,next)=>{ 
    assetController.createAssetDraft(req,res,next)
})

// user can fetch its all assets
assetRouter.get("/:id/assets", (req,res,next)=>{ 
    assetController.getUserAsset(req,res,next) 
})

export default assetRouter;
