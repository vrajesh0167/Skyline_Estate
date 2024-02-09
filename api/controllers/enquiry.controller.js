import { Enquiry } from "../models/enquiry.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const enquiry = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        const enquiryUser = await Enquiry.create({ name, email, phone });

        return res.status(201).json(enquiryUser);
    } catch (error) {
        return next(
            errorHandler(500, `something went wrong while create enquiry ${error}`)
        );
    }
};
