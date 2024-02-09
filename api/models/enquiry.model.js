import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    email: {
        type:'string',
        required: true
    },
    phone: {
        type:'string',
        required: true
    }
},{timestamps: true})

export const Enquiry = mongoose.model('Enquiry', enquirySchema);