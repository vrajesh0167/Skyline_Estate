import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            // unique: true,
        },
        email: {
            type: String,
            required: true,
            toLowerCase: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["User", "Admin"],
            default: "User",  // Default role is "User"
        },
        avatar: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        },
        refreshToken: {
            type: String,
        }
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
