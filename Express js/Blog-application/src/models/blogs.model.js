import mongoose, { Schema } from "mongoose";

const blogSChema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)

export const BlogEntries = mongoose.model("BlogEntries", blogSChema);