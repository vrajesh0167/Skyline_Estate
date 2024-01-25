import { Listing } from "../models/listing.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json({
            message: "Listing created successfully",
            listing,
        });
    } catch (error) {
        return next(
            errorHandler(500, `somethig went wrong while user create listing. ${error.message}`)
        )
    }
};
