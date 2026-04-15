import express from "express";
// import { authMiddleware } from "../middlewares/auth.middleware.js";
import { register, login, logout, refreshAccessToken } from "../controllers/authController.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);

// Protected route
// router.post("/logout", authMiddleware, logout);

export default router;