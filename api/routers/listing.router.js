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
router.put("/update/:id", verifyToken, updateUserListing);
router.get("/editlisting/:id", getEditListing);

export default router;
