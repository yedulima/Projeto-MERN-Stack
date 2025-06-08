import Post from "../models/Post.js";

const createService = (body) => Post.create(body);

const findAllService = (limit, offset) => Post.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("user");

const countService = () => Post.countDocuments();

const topPostsService = () => Post.findOne()
    .sort({ _id: -1 })
    .populate("user");

export { createService, findAllService, countService, topPostsService };