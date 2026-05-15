import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const adminMiddleware = asyncHandler(async (req, res, next) => {

  if (req.user?.role !== "admin") {
    throw new ApiError(403, "Unauthorized - Not an admin");
  }
  next();
});