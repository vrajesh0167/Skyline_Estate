import mongoose from "mongoose";

const newslatterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
}, {timestamps: true});

export const Newslatter = mongoose.model("Newslatter", newslatterSchema);