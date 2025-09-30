import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // get user details form frontend
    const { fullname, email, username, password } = req.body

    // validation - not empty
    if ([fullname, email, username, password].some((filed) => filed?.trim() === "")) {
        throw new ApiError(400, "All fileds are required.")
    }

    // check if user already exists: username, email
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username alreay exits.")
    }

    // check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) throw new ApiError(400, "Avatar required.")

    // upload them to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) throw new ApiError(400, "Avatar file is required.")

    // create user object - create entry in db
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase(),
        password
    })

    // remove password and refresh token filed
    const createUser = await User.findById(user._id).select("-password -refreshToken")

    // check for user creation 
    if (!createUser) throw new ApiError(500, "Something went wrong while register the user.")

    // return response
    return res.status(201).json(
        new ApiResponse(200, createUser, "User register Successfully")
    )
})


export {
    registerUser
}