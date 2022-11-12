import mongoose from "mongoose";

const unitsSchema = mongoose.Schema({
    unit_name:{
        type: String
    },
    system:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'System'
    },
    context:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Context'
    }
});

const Units = mongoose.model('Units', unitsSchema);

export default Units;