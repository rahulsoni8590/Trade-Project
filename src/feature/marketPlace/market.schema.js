import mongoose from "mongoose"
const marketSchema = new mongoose.Schema({
    assetid:{type: mongoose.Schema.Types.ObjectId, ref:"asset" }, //asset that has been marked as listed/published
    proposals:[ // list of all the proposal received for this asset can contain different user
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:"proposal"
        }
    ]
})

const marketModel = mongoose.model("marketlist", marketSchema);

export default marketModel;
// To populate every socialMediaHandles entry's oauth property, you should populate on socialMediaHandles.$*.oauth:
// const user = await User.findOne().populate('socialMediaHandles.$*.oauth');
