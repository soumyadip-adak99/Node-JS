import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getLoggedUser } from "../utils/loggedUser.js";


export const getUserDetails = asyncHandler(async (req, res) => {
    try {
        const userEmail = getLoggedUser(req);

        if (!userEmail) {
            return res.status(401).json(
                new ApiError(401, "User unauthrize")
            );
        }

        const user = await User.findOne({ email: userEmail }).select("-refreshToken");

        if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }

        return res.status(200).json(new ApiResponse(200, { user }, "User details get successfully"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Something went on server."));
    }
});



