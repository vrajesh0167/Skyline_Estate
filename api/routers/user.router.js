import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { deleteUser, getuser, signOut, userUpdate } from "../controllers/user.controller.js";

const router = express.Router();

router.put("/update/:id", verifyToken, userUpdate);
router.delete("/signout/:id", verifyToken, signOut);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/:id', verifyToken, getuser);

export default router;