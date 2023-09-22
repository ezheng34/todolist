import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export const toDo = mongoose.model('toDo', todoSchema);
