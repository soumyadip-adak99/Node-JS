import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from './../utils/asyncHandler.js';
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // 1. Try to get token from cookies or Authorization header
        const authHeader = req.header("Authorization");
        const token =
            req.cookies?.accessToken ||
            (authHeader && authHeader.startsWith("Bearer ") && authHeader.split(" ")[1]);

        if (!token) {
            throw new ApiError(401, "Unauthorized: Token not found");
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decoded || !decoded._id) {
            throw new ApiError(401, "Invalid or malformed token");
        }

        // 3. Get user
        const user = await User.findById(decoded._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        throw new ApiError(401, error.message || "Invalid token");
    }
});


export const findLoggedUser = asyncHandler(async (req, _, next) => {
    try {
        const authHeader = req.header("Authorization");
        const token = req.cookies?.accessToken || (authHeader && authHeader.replace("Bearer ", "").trim());

        if (!token) {
            throw new ApiError(401, "Unauthorized: no token provided.");
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(404, "User not found.");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Invalid or expired token.");
    }
});
