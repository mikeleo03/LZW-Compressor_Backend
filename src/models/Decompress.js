import mongoose from "mongoose";

const DecompressSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    decompressed: {
        type: String,
        required: true,
    },
    enhanced: {
        type: String,
        required: true,
    },
});

const DecompressModel = mongoose.model('decompression', DecompressSchema);

export default DecompressModel;