import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "user name in required"],
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
        },
        notes: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
