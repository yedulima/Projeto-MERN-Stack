import User from "../models/User.js";

export const createService = (body) => User.create(body);

export const findAllService = () => User.find();

export const savedPostsService = () => User.find({}, "savedPosts").populate("savedPosts.postId");

export const findByIdService = (id) => User.findById(id);

export const updateService = (
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
) =>
    User.findOneAndUpdate(
        { _id: id },
        { name, username, email, password, avatar, background }
    );

export const savePostOnUserService = (id, postId, created) =>
    User.findOneAndUpdate(
        { _id: id },
        { $push: { savedPosts: { postId, created } } }
    );
