import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import { oauth2Client } from "../utils/google.config.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateTokens.js";

export const googleLogin = asyncHandler(async (req, res) => {
    try {
        const { code } = req.query;
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        const { email, name, picture } = userRes.data;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                image: picture,
            });
        }

        const { token } = await generateToken(user._id);

        return res.status(200).json({
            message: "User logged in successfully",
            token, 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
            },
        });
    } catch (error) {
        console.error("Error in googleLogin:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
