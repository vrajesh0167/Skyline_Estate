import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
    createListing,
    getUserListing,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/listing", verifyToken, createListing);
router.get("/listings/:id", verifyToken, getUserListing);

export default router;
