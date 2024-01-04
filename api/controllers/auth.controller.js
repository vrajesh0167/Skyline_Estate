import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';

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
        next(error);
    }
}