import express from 'express';
import { enquiry } from '../controllers/enquiry.controller.js';

const router = express.Router();

router.post('/enquiryregister', enquiry);

export default router;