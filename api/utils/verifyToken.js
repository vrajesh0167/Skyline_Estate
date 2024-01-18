import { errorHandler } from "./errorHandler.js"
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    // console.log(token);
    if(!token){
        return next(errorHandler(401, 'unauthorized'));
    }

    jwt.verify(token, process.env.ACCESS_SECRET, (error, user) =>{
        if(error){
            return next(errorHandler(401, 'Invalid acccess token'));
        }

        req.user = user;
        // console.log(req.user.id);
        next();
    })
}