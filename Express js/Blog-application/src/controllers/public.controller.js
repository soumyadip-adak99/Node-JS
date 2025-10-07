import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessAndRefreshToken } from "../utils/generateToken.js";
import { options } from "../utils/constance.js";

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


export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        throw new ApiError(400, "Email and password are required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    // password check
    const isValidPassword = await user.isPasswordCorrect(password);

    if (!isValidPassword) {
        throw new ApiError(401, "Invalid password.");
    }

    // access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedUser = await User.findById(user._id).select("-password -refreshToken");

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully",
            )
        );
});
