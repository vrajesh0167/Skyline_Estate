import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcrypt from "bcrypt";

// user Update Controller
export const userUpdate = async (req, res) => {
    // console.log(req.params.id);
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only update your own account."));
    }

    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            { new: true }
        );
        console.log(updateUser);
        const { password, ...rest } = updateUser._doc;
        return res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

// signOut Controller
export const signOut = (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only sign out own account. "));
    }
    try {
        return res
            .status(200)
            .clearCookie("access_token")
            .json("Sign out successfully !");
    } catch (error) {
        return next(errorHandler(500, "Something went wrong while user sign out"));
    }
};

//Delete Controller
export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only delete your own account."));
    }


    try {
        await User.findByIdAndDelete(req.user.id);

        return res.status(200).clearCookie('access_token').json('User Delete Successful');

    } catch (error) {
        return next(errorHandler(500))
    }
};

//getuser 
export const getuser = async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.params.id });

        if (!user) {
            return next(errorHandler(401, "User not found"));
        }
        const { password: pass, ...rest } = user._doc;

        return res.status(200).json(rest);
    } catch (error) {
        return next(errorHandler(500, `something went wrong while getting user ${error}`));
    }
}

// Fetch all users (Admin):-
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, "username email role avatar");

        if (!users.length) {
            return next(errorHandler(404, "No users found"));
        }

        res.status(200).json(users);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};


export const DeleteUser = async (req, res, next) => {
    // if (req.user.role !== "admin") {
    //     return res.status(403).json({ message: "Access denied" });
    // }

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.deleteOne();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};