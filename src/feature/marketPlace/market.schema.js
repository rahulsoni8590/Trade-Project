import mongoose from "mongoose"
const marketSchema = new mongoose.Schema({
    assetid:{type: mongoose.Schema.Types.ObjectId, ref:"asset" }, //asset that has been marked as listed/published
})

const marketModel = mongoose.model("marketlist", marketSchema);

export default marketModel;
