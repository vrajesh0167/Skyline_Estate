import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { userUpdate } from '../controllers/user.controller.js';

const router = express.Router();

router.put('/update/:id', verifyToken, userUpdate)

export default router;