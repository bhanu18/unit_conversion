import mongoose from "mongoose";

const PairsSchema = mongoose.Schema({
    pairs_name: {
        type: String
    },
    val1:{
        type: Number
    },
    val2:{
        type: Number
    },
    pair1: {
        type: mongoose.Schema.Types.ObjectId,
    },
    pair2: {
        type: mongoose.Schema.Types.ObjectId,
    },
    type: {
        type: String
    }
})

const Pairs = mongoose.model('Pairs', PairsSchema);

export default Pairs;