import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
    createListing,
    deleteUserListing,
    getEditListing,
    getUserListing,
    updateUserListing,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/listing", verifyToken, createListing);
router.get("/listings/:id", verifyToken, getUserListing);
router.delete("/delete/:id", verifyToken, deleteUserListing);
router.put("/update/:id", updateUserListing);
router.get("/getlisting/:id", getEditListing);

export default router;
