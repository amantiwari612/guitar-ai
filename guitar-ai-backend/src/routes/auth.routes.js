import express from "express";
import { register, login, logout, refreshAccessToken, getCurrentUser, getAllUsers } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);

// Protected route
router.post("/logout", authMiddleware, logout);

// to test the auth middleware
router.get("/me", authMiddleware, getCurrentUser);

router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

export default router;