import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { createListing } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/listing', verifyToken, createListing)

export default router;