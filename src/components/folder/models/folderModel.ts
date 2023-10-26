import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            default: "newFolder",
            unique: true,
        },
        todo: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "todo",
                default: [],
            },
        ],
        note: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "note",
                default: [],
            },
        ],
    },
    { timestamps: true }
);

const Folder = mongoose.model("Folder", folderSchema);
export default Folder;
