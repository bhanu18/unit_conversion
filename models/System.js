import mongoose from "mongoose";

const SystemSchema = mongoose.Schema({
    system_name: {
        type: String
    }
})

const System = mongoose.model('System', SystemSchema);

export default System;