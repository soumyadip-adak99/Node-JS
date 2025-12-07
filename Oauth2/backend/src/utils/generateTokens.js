import { User } from "../models/user.model.js";

export async function generateToken(userId) {
    try {
        const user = await User.findById(userId);
        const token = user.generateToken();

        user.refreshToken = token;
        await user.save({ validateBeforeSave: false });

        return { token };
    } catch (error) {
        throw new Error("Error generating token");
    }
}
