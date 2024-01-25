import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    furnished: {
        type: Boolean,
        required: true
    },
    offer: {
        type: Boolean,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    bathrooms: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    regularPrice: {
        type: Number,
        required: true,
        min: 50,
        max: 10000000
    },
    discountPrice: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    userRef: {
        type: String,
        required: true
    },
    imageUrls: {
        type: Array,
        required: true
    }

}, { timestamps: true });

export const Listing = mongoose.model("Listing", listingSchema);
