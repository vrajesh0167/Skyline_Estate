import { Listing } from "../models/listing.model.js";
import { User } from "../models/user.model.js";
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
        if (!updateListing) {
            return next(errorHandler(401, "Listing not found"));
        }
        return res
            .status(200)
            .json({ message: "Update listing successfully.", updateListing });
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
export const getEditListing = async (req, res, next) => {
    // console.log(req.params.id);
    try {
        const getEditListing = await Listing.findById(req.params.id);

        if (!getEditListing) {
            return next(errorHandler(401, "Listing not found"));
        }
        return res.status(200).json(getEditListing);
    } catch (error) {
        return next(
            errorHandler(500, `something went wrong while get edit listing ${error}`)
        );
    }
};

// get all listings from database
export const getAllListings = async (req, res, next) => {
    try {
        const getAllListings = await Listing.find();
        // console.log('userRef:- ', getAllListings[0].userRef);

        if (!getAllListings) {
            return next(errorHandler(401, "Listing not found"));
        }
        const getListingUser = await User.findById({
            _id: getAllListings[0].userRef,
        });
        // console.log(getListingUSer);

        const customResponse = {
            listings: getAllListings,
            user: getListingUser,
        };

        return res.status(200).json(customResponse);
    } catch (error) {
        return next(
            errorHandler(500, `something went wrong while get all listings ${error}`)
        );
    }
};

// search listing
export const searchListing = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let offer = req.query.offer;
        if (offer === undefined || offer === "false") {
            offer = { $in: [false, true] };
        }

        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === "false") {
            furnished = { $in: [false, true] };
        }

        let parking = req.query.parking;
        if (parking === undefined || parking === "false") {
            parking = { $in: [false, true] };
        }

        let type = req.query.type;
        if (type === undefined || type === "all") {
            type = { $in: ["sale", "rent"] };
        }

        const searchTerm = req.query.searchTerm || "";
        const sort_order = req.query.sort_order || "createdAt";
        const order = req.query.order || "desc";
        // console.log(sort_order);
        // console.log(order);

        let sortCriteria = {};
        if (sort_order === 'regularprice'){
            sortCriteria = { regularPrice: order === 'desc' ? -1 :  1 };
        } else {
            sortCriteria = {
                [sort_order]: order ,
            };
        }

        const listings = await Listing.find({
            Name: { $regex: searchTerm, $options: "i" },
            offer,
            furnished,
            parking,
            type,
        })
            .sort(sortCriteria)
            .limit(limit)
            .skip(startIndex);
        // console.log(listings);

        const getListingsUser =
            listings.length > 0
                ? await User.findById({ _id: listings[0].userRef })
                : null;
        // console.log(getListingsUser);

        const customResponse = {
            listings: listings,
            user: getListingsUser,
        };

        return res.status(200).json(customResponse);
    } catch (error) {
        return next(
            errorHandler(500, `something went wrong while user searching ${error}`)
        );
    }
};
