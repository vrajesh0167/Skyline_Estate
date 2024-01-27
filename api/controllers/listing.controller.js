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
        return next(errorHandler(500,`Something went wrong while user getListing. ${error}`))
    }
}

export const deleteUserListing = async (req, res, next) =>{
    const listing = await Listing.findById(req.params.id);

    if(!listing){
        return next(errorHandler(401, "listing not found."))
    }
    if(req.user.id !== listing.userRef){
        return next(errorHandler(401, "please signin again"))
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Listing deleted successfully",
        });
    } catch (error) {
        return next(errorHandler(500, `Something went wrong while user delete listing, ${error}`))
    }
}