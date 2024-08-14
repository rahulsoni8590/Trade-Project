import express from "express"
import AssetController from "./asset.controller.js";
import fileUpload from "../../middleware/fileupload.js";

const assetRouter = express.Router();
const assetController = new AssetController()


// mark lish as true and also publish
assetRouter.put("/:id/publish",(req,res,next)=>{ // add a new asset
    assetController.listAssetOnMarketplace(req,res,next)
})

//get asset details based on id
assetRouter.get("/:id", (req,res,next)=>{ 
    assetController.getAssetDetail(req,res,next)
}) 

// only currentholder can update the asset detail
assetRouter.post("/:id", (req,res,next)=>{ 
    assetController.updateAsset(req,res,next)
}) 

// add a new asset
assetRouter.post("/", fileUpload.single("image") ,(req,res,next)=>{ 
    assetController.createAssetDraft(req,res,next)
})


// assetRouter.get("/users/:id/assets", getuserasset) // user can fetch its all assets

export default assetRouter;