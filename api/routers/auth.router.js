import express from "express";
import { google, signin, signup } from "../controllers/auth.controller.js";
// import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);

// //Admin route :-
// router.get("/admin", verifyToken, (req, res) => {
//     res.status(200).json({ message: "Welcome, Admin!" });
// });

export default router;