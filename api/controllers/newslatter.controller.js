import { Newslatter } from "../models/newslatter.model.js";
import { errorHandler } from "../utils/errorHandler.js"

export const newslatter = async (req, res, next) =>{
    try {
        const newslatter = await Newslatter.create({
            email: req.body.email
        })

        return res.status(201).json(newslatter);
    } catch (error) {
        return next(errorHandler(500, `something went wrong while sign to newslatter ${error}`));
    }
}