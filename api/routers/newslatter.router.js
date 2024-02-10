import express from 'express';
import { newslatter } from '../controllers/newslatter.controller.js';

const router = express.Router();

router.post('/signup', newslatter);

export default router;