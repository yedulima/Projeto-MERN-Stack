import Post from "../models/Post.js";

export const createService = (body) => Post.create(body);

export const findAllService = (limit, offset) => Post.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("user");

export const countService = () => Post.countDocuments();

export const topPostsService = () => Post.findOne()
    .sort({ _id: -1 })
    .populate("user");

export const findByIdService = (id) => Post.findById(id)
    .populate("user");

export const searchByTitleService = (title) => Post.find({
    title: {
        $regex: `${title || ""}`,
        $options: "i"},
    })
    .sort({ _id: -1 })
    .populate("user");

export const searchByUserService = (id) => Post.find({
        user: id
    })
    .sort({ _id: -1 })
    .populate("user");

export const updateService = (
    id,
    title,
    text,
    banner
    ) => Post.findOneAndUpdate(
        { _id: id },
        { title, text, banner },
        { rawResult: true }
    );

export const excludeService = (id) => Post.findOneAndDelete({ _id: id });