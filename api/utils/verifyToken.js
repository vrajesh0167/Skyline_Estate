import { errorHandler } from "./errorHandler.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const accessToken = req.cookies.access_token;
    // console.log(accessToken);
    if (!accessToken) {
        const refreshToken = req.cookies.refresh_token;

            if (!refreshToken) {
                return next(errorHandler(401, "Refresh token not provided"));
            }

            try {
                const refreshDecoded = jwt.verify(
                    refreshToken,
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
            // Token has expired, handle refresh
            const refreshToken = req.cookies.refresh_token;

            if (!refreshToken) {
                return next(errorHandler(401, "Refresh token not provided"));
            }

            try {
                const refreshDecoded = jwt.verify(
                    refreshToken,
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
