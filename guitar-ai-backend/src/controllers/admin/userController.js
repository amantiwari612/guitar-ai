import User from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";

export const addUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, isRestricted } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "user",
    isRestricted
  })

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User created successfully"));

})

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (id === req.user._id.toString()) {
    throw new ApiError(400, "You cannot delete own admin");
  }
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res.status(200).json(new ApiResponse(200, user, "User deleted successfully"));
})

export const toogleUserRestriction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isRestricted } = req.body;

  if (typeof (isRestricted) !== "boolean") {
    throw new ApiError(400, "Invalid isRestricted value")
  }
  const user = await User.findByIdAndUpdate(
    id,
    { $set: { isRestricted } },
    { new: true }
  );
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res.status(200).json(new ApiResponse(200, user, `User ${isRestricted ? "restricted" : "unrestricted"} successfully`));
})