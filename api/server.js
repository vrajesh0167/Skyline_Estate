import express from "express";
import dotenv from "dotenv";
import authRouter from "./routers/auth.router.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from "./routers/user.router.js";
import listingRouter from "./routers/listing.router.js";

dotenv.config();

const app = express();

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/create", listingRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
});
