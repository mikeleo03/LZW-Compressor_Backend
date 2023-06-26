import mongoose from "mongoose";

const CompressSchema = new mongoose.Schema({
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
    compressed: {
        type: String,
        required: true,
    },
    enhanced: {
        type: String,
        required: true,
    },
    remained: {
        type: Number,
        required: true,
    },
});

const CompressModel = mongoose.model('compression', CompressSchema);

export default CompressModel;