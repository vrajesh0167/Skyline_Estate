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

export const getUserListing = async (req, res, next) =>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"please signin again."))
    }
    try {
        const getlisting = await Listing.find({userRef: req.params.id});
        return res.status(200).json(getlisting);
    } catch (error) {
        return next(errorHandler(401,"please signin again."))
    }
}
