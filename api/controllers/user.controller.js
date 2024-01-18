import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcrypt from "bcrypt";

export const userUpdate = async (req, res) => {
    console.log(req.params.id);
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
