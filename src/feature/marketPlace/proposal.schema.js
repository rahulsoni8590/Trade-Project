import mongoose from "mongoose"
const proposalSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref:"user" },// user which has send the proposal
    assetid:{type: mongoose.Schema.Types.ObjectId, ref:"asset"},
    status:{type:String, enum:["pending","accepted", "denied"], default:"pending"}, // status of proposal only curren-holder can update
    proposedPrice:{type:Number} // proposed value
})

const proposalModel = mongoose.model("proposal", proposalSchema);

export default proposalModel;
