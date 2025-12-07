import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"; 

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
});

UserSchema.methods.generateToken = function () {

    return jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIMEOUT,
    });
};

export const User = mongoose.model("user-collection", UserSchema);
