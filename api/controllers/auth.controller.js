import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    // console.log(req.body);
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    try {
        const userCreate = await User.create({
            username,
            email,
            password: hashPassword,
        });
        // console.log(userfind);

        res.status(201).json("User Create Successfully...");
    } catch (error) {
        // res.status(500).json("Internal Server Error");
        return next(errorHandler(209, "User Already Exits..."));
    }
};

export const signin = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        if (!username && !email) {
            return next(errorHandler(401, "username or email is required "));
        }
        const userFind = await User.findOne({ $or: [{ username }, { email }] });
        if (!userFind) {
            return next(errorHandler(404, "User Not Found..."));
        }

        const matchPass = await bcrypt.compare(password, userFind.password);
        if (!matchPass) {
            return next(errorHandler(403, "Invalid Password..."));
        }

        const access_token = jwt.sign(
            { id: userFind._id },
            process.env.ACCESS_SECRET
        );
        res
            .cookie("access_token", access_token, { httpOnly: true })
            .status(200)
            .json("User Loaging Successfully");
    } catch (error) {
        return next(error);
    }
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET);
            const { password: pass, ...rest } = user._doc;

            return res
                .status(200)
                .cookie("access_token", token, { httpOnly: true })
                .json(rest);
        } else {
            const generatePassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashPassword = await bcrypt.hash(generatePassword, 10);

            const user = new User({
                username: req.body.name,
                email: req.body.email,
                password: hashPassword,
            });
            await user.save();

            const token = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET);
            const { password: pass, ...rest } = user._doc;

            return res
                .status(200)
                .cookie("access_token", token, { httpOnly: true })
                .json(rest);
        }
    } catch (error) {
        return next("Google Sign in fail :- ".error);
    }
};
