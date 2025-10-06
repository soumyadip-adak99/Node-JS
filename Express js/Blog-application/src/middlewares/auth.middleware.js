import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from './../utils/asyncHandler.js';
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request.");
        }

        const decodedToken = jwt.verify(token, process.ACCESS_TOKEN_SECRECT);
        const user = await User.findOne(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid accesstoken");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid accesstoken")
    }
});