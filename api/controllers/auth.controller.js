import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async (req, res, next) =>{
    // console.log(req.body);
    const {username, email, password} = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    try {
        const userfind = await User.create({
            username,
            email,
            password: hashPassword
        })
        // console.log(userfind);

        res.status(201).json("User Create Successfully...")
    } catch (error) {
        // res.status(500).json("Internal Server Error");
        next(errorHandler(209, "User Already Exits..."))
    }
}