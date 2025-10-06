import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if ([first_name, last_name, email, password].some((filed) => filed?.trim() === "")) {
        throw new ApiError(400, "All fileds are required");
    }

    // find the user using email
    const exitedUser = await User.findOne({ email });

    if (exitedUser) throw new ApiError(409, "User with email already exits.");

    // create user object - create entry in db
    const user = await User.create({
        first_name, last_name, email, password
    });

    // remove the user password filed and refresh token fild
    const createUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createUser) {
        throw new ApiError(500, "Something went wrong on server.");
    }

    return res.status(200).json(
        new ApiResponse(200, createUser, "user register successfully")
    );
});
