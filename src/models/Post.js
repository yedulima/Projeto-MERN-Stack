import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: {
        type: Array,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    saves: {
        type: Array,
        required: true,
    },
    comments: {
        type: Array,
        required: true,
    },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
