import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    currentHolder:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    averageTradingPrice:{ type:  Number, default:0 } ,
    lastTradingPrice:{ type:  Number, default:0 },
    numberOfTransfers:{ type:  Number, default:0 } ,
    isListed: { type: Boolean, default:false },
    price:{type:Number},
    tradingJourney: [
        {
            holder: { type:mongoose.Schema.Types.ObjectId, ref:"user"},
            date: { type: Date },
            price: { type: Number }
        }
    ],
    proposals: { type: Number, default:0 }
})

const assetModel = mongoose.model("asset", assetSchema)

export default assetModel
