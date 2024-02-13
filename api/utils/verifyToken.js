import { User } from "../models/user.model.js";
import { errorHandler } from "./errorHandler.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    const accessToken = req.cookies.access_token;
    let refreshTokens = req.cookies.refresh_token;
    // console.log(accessToken);

    const user = await User.findById({_id: req.params.id});
    // console.log("user", user);

    if (!accessToken) {

            if (!refreshTokens) {
                // const user = await User.findById({_id: req.params.id});
                refreshTokens = user.refreshToken;
            }
            console.log(refreshTokens);

            try {
                const refreshDecoded = jwt.verify(
                    refreshTokens,
                    process.env.REFRESH_SECRET
                );

                // Generate a new access token
                const newAccessToken = jwt.sign(
                    {id: refreshDecoded.id},
                    process.env.ACCESS_SECRET,
                    {expiresIn: process.env.ACCESSTOKEN_EXPIRATION}
                )

                 // Update the access token in the response
                res.cookie('access_token', newAccessToken, { httpOnly: true });

                req.user = refreshDecoded;
                return next();
            } catch (error) {
                return next(errorHandler(401, "Invalid refresh token"));
            }
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);

        // Check if token has expired
        if (decoded.exp * 1000 < Date.now()) {

            if (!refreshTokens) {
                return next(errorHandler(401, "Refresh token not provided"));
            }

            try {
                const refreshDecoded = jwt.verify(
                    refreshTokens,
                    process.env.REFRESH_SECRET
                );

                // Generate a new access token
                const newAccessToken = jwt.sign(
                    {id: refreshDecoded.id},
                    process.env.ACCESS_SECRET,
                    {expiresIn: process.env.ACCESSTOKEN_EXPIRATION}
                )

                 // Update the access token in the response
                res.cookie('access_token', newAccessToken, { httpOnly: true });

                req.user = refreshDecoded;
                return next();
            } catch (error) {
                return next(errorHandler(401, "Invalid refresh token"));
            }
        }

        req.user = decoded;
        return next();
    } catch (error) {
        return next(errorHandler(401, "Invalid refresh token"));
    }
};
