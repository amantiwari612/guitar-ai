import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.header("Authorization").replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized");
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, "Unauthorized");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error.message || "Unauthorized");
    }
});