import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { deleteUser, getuser, signOut, userUpdate, getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.put("/update/:id", verifyToken, userUpdate);
router.delete("/signout/:id", verifyToken, signOut);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/:id', verifyToken, getuser);
router.get('/admin/users', verifyToken, getAllUsers); // Fetch all users (Admin)

export default router;

