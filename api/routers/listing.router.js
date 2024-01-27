import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
    createListing,
    deleteUserListing,
    getUserListing,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/listing", verifyToken, createListing);
router.get("/listings/:id", verifyToken, getUserListing);
router.delete("/delete/:id", verifyToken, deleteUserListing);

export default router;
