import mongoose from "mongoose";

const ContextSchema = mongoose.Schema({
    context_name: {
        type: String
    }
})

const Context = mongoose.model('Context', ContextSchema);

export default Context;