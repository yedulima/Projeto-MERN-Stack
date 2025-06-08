import { createService, findAllService, countService, topPostsService } from "../services/post.service.js";

const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body;

        if (!title || !text || !banner) {
            res.status(400).send({ message: "Submit all fields for registration." });
        };

        await createService({
            title,
            text,
            banner,
            user: req.userId,
        });

        res.status(201).send({ message: "Post created successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
};

const findAll = async (req, res) => {
    try {

        let { limit, offset } = req.query;

        limit = Number(limit);
        offset = Number(offset);

        if (!limit) {
            limit = 5;
        };

        if (!offset) {
            offset = 0;
        };

        const posts = await findAllService(limit, offset);
        const total = await countService();
        const currentUrl = req.baseUrl;

        const next = limit + offset;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${offset}` : null;

        const previous = offset - limit < 0 ? null : offset < limit;
        const previousUrl = previous !== null ? `${currentUrl}?limit=${limit}&offset=${offset}` : null;

        if (posts.length === 0) {
            return res.status(400).send({ message: "There are no registred posts." });
        };

        res.status(200).send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: posts.map(post => ({
                id: post._id,
                title: post.title,
                text: post.text,
                banner: post.banner,
                likes: post.likes,
                comments: post.comments,
                
                name: post.user.name,
                userName: post.user.username,
                userAvatar: post.user.avatar,
            })),
        });
    } catch (err) {
        res.status(400).send({ message: err.message });
    };
};

const topPosts = async (req, res) => {
    try {
        const post = await topPostsService();

        if (!post) {
            return res.status(400).send({ message: "There is no registred posts" });
        };

        res.status(200).send({
            post: {
                id: post._id,
                title: post.title,
                text: post.text,
                banner: post.banner,
                likes: post.likes,
                comments: post.comments,
                
                name: post.user.name,
                userName: post.user.username,
                userAvatar: post.user.avatar,
            },
        });
    } catch (err) {
        res.status(400).send({ message: err.message });
    };
};

export { create, findAll, topPosts };