import { Listing } from "../models/listing.model.js";
import { errorHandler } from "../utils/errorHandler.js";

//create listing
export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json({
            message: "Listing created successfully",
            listing,
        });
    } catch (error) {
        return next(
            errorHandler(
                500,
                `somethig went wrong while user create listing. ${error.message}`
            )
        );
    }
};

// getUser listing
export const getUserListing = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "please signin again."));
    }
    try {
        const getlisting = await Listing.find({ userRef: req.params.id });
        return res.status(200).json(getlisting);
    } catch (error) {
        return next(
            errorHandler(500, `Something went wrong while user getListing. ${error}`)
        );
    }
};

// delete listing
export const deleteUserListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(401, "listing not found."));
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "please signin again"));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Listing deleted successfully",
        });
    } catch (error) {
        return next(
            errorHandler(
                500,
                `Something went wrong while user delete listing, ${error}`
            )
        );
    }
};

//update user listing
export const updateUserListing = async (req, res, next) => {
    try {
        const updateListing = await Listing.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if(!updateListing){
            return next(errorHandler(401, 'Listing not found'));
        }
        return res.status(200).json({message: "Update listing successfully.", updateListing});
    } catch (error) {
        return next(
            errorHandler(
                500,
                `Something went wrong while user updating listing ${error}`
            )
        );
    }
};

// get edit listing
export const getEditListing = async (req, res, next) =>{
    // console.log(req.params.id);
    try {
        const getEditListing = await Listing.findById(req.params.id);

        if(!getEditListing){
            return next(errorHandler(401, 'Listing not found'));
        }
        return res.status(200).json(getEditListing);
    } catch (error) {
        return next(errorHandler(500, `something went wrong while get edit listing ${error}`));
    }
}