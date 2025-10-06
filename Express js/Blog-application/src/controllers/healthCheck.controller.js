import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const healthCheck = asyncHandler((_, res) => {
    return res.status(200).json(
        new ApiResponse(200, { message: "OK" }, 'Server running perfect')
    );
});