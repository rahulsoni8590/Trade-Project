import mongoose from "mongoose"
const proposalSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref:"user" },// user which has send the proposal
    status:{type:String, enum:["pending","accepted", "denied"], default:"pending"}, // status of proposal only curren-holder can update
    proposedPrice:{type:Number} // proposed value
})

const proposalModel = mongoose.model("marketlist", proposalSchema);

export default proposalModel;
