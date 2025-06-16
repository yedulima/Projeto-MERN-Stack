import Post from "../models/Post.js";

export const createService = (body) => Post.create(body);

export const findAllService = (limit, offset) =>
    Post.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

export const countService = () => Post.countDocuments();

export const topPostsService = () =>
    Post.findOne().sort({ _id: -1 }).populate("user");

export const findByIdService = (id) => Post.findById(id).populate("user");

export const searchByTitleService = (title) =>
    Post.find({
        title: {
            $regex: `${title || ""}`,
            $options: "i",
        },
    })
        .sort({ _id: -1 })
        .populate("user");

export const searchByUserService = (id) =>
    Post.find({
        user: id,
    })
        .sort({ _id: -1 })
        .populate("user");

export const updateService = (id, title, text, banner) =>
    Post.findOneAndUpdate(
        { _id: id },
        { title, text, banner },
        { rawResult: true }
    );

export const excludeService = (id) => Post.findOneAndDelete({ _id: id });

export const likeService = (id, userId) =>
    Post.findOneAndUpdate(
        { _id: id, "likes.userId": { $nin: [userId] } },
        { $push: { likes: { userId, created: new Date() } } }
    );

export const deleteLikeService = (id, userId) =>
    Post.findOneAndUpdate({ _id: id }, { $pull: { likes: { userId } } });

export const viewsService = (id) =>
    Post.findOneAndUpdate({ _id: id }, { $inc: { views: 1 } }, { new: true });

export const saveService = (id, userId, created) =>
    Post.findOneAndUpdate(
        { _id: id, "saves.userId": { $nin: [userId] } },
        { $push: { saves: { userId, created } } }
    );

export const unsaveService = (id, userId) =>
    Post.findOneAndUpdate({ _id: id }, { $pull: { saves: { userId } } });

export const addCommentService = (id, userId, text) => {
    const idComment = Math.floor(Date.now() * Math.random()).toString(36);

    return Post.findOneAndUpdate(
        { _id: id },
        {
            $push: {
                comments: {
                    idComment,
                    userId,
                    text,
                    replies: [],
                    createdAt: new Date(),
                },
            },
        },
        { new: true }
    );
};

export const deleteCommentService = (id, userId, idComment) =>
    Post.findOneAndUpdate(
        { _id: id },
        { $pull: { comments: { idComment, userId } } }
    );

export const addReplyService = async (postId, idComment, userId, text) => {
    const idReply = Math.floor(Date.now() * Math.random()).toString(36);

    return Post.findOneAndUpdate(
        { _id: postId },
        {
            $push: {
                "comments.$[idComment].replies": {
                    idReply,
                    userId,
                    text,
                    createdAt: new Date(),
                },
            },
        },
        {
            arrayFilters: [{ "idComment.idComment": idComment }],
        }
    );
};

export const deleteReplyService = (id, idComment, userId, replyId) =>
    Post.findOneAndUpdate(
        { _id: id },
        {
            $pull: {
                "comments.$[idComment].replies": {
                    idReply: replyId,
                    userId: userId,
                },
            },
        },
        {
            arrayFilters: [{ "idComment.idComment": idComment }],
        }
    );