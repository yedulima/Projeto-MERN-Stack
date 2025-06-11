import { 
    createService,
    findAllService,
    countService,
    topPostsService,
    searchByTitleService,
    searchByUserService,
    updateService,
    excludeService,
    likeService,
    deleteLikeService,
    addCommentService,
    deleteCommentService,
} from "../services/post.service.js";

export const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body;

        if (!title || !text || !banner) {
            return res.status(400).send({ message: "Submit all fields for registration." });
        };

        await createService({
            title,
            text,
            banner,
            user: req.userId,
        });

        return res.status(201).send({ message: "Post created successfully!" });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    };
};

export const findAll = async (req, res) => {
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

        return res.status(200).send({
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
        return res.status(400).send({ message: err.message });
    };
};

export const findById = async (req, res) => {
    try {
        const post = req.post;

        return res.status(200).send({
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
        return res.status(500).send({ message: err.message });
    };
};

export const topPosts = async (req, res) => {
    try {
        const post = await topPostsService();

        if (!post) {
            return res.status(400).send({ message: "There is no registred posts" });
        };

        return res.status(200).send({
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
        return res.status(400).send({ message: err.message });
    };
};

export const searchByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        const posts = await searchByTitleService(title);

        if (posts.length === 0) {
            return res.status(400).send({ message: "There are no posts with this title." });
        };

        return res.status(200).send({
            posts: posts.map(post => ({
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
        return res.status(500).send({ message: err.message });
    };
};

export const searchByUserId = async (req, res) => {
    try {
        const userId = req.userId;
        const posts = await searchByUserService(userId);

        if (posts.length === 0) {
            return res.status(400).send({ message: "This user has no posts." });
        };

        return res.status(200).send({
            posts: posts.map(post => ({
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
        return res.status(500).send({ message: err.message });
    };
};

export const update = async (req, res) => {
    try {
        const { title, text, banner } = req.body;
        const { id, post } = req;

        if (!title && !text && !banner) {
            return res.status(400).send({ message: "Submit at least one field for update." });
        };

        if (post.user._id != req.userId) {
            return res.status(400).send({ message: "User unauthorized." });
        };

        await updateService(
            id,
            title,
            text,
            banner
        );

        return res.status(200).send({ message: "Post successfully updated." });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    };
};

export const exclude = async (req, res) => {
    try {
        const { id, post, userId } = req;

        if (post.user._id != userId) {
            return res.status(400).send({ message: "User unauthorized." });
        };

        await excludeService(id);

        return res.status(200).send({ message: "Post successfully deleted." });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    };
};

export const like = async (req, res) => {
    try {
        const { id, userId } = req;

        const postLike = await likeService(id, userId);

        if (!postLike) {
            await deleteLikeService(id, userId);
            return res.status(200).send({ message: "Like successfully removed." });
        };

        return res.status(200).send({ message: "Like successfully added." });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    };
};

export const addComment = async (req, res) => {
    try {
        const { id, userId } = req;
        const { text } = req.body;

        if (!text) {
            return res.status(400).send({ message: "Write something." });
        };

        await addCommentService(id, userId, text);

        return res.status(200).send({ message: "Comment successfully added." });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    };
};

export const deleteComment = async (req, res) => {
    try {
        const { id, userId } = req;
        const { idComment } = req.params;

        const deletedComment = await deleteCommentService(id, userId, idComment);

        const commentFinder = deletedComment.comments.find(
            (comment => comment.idComment === idComment)
        );

        if (!commentFinder) {
            return res.status(400).send({ message: "Comment not found." });
        };

        if (commentFinder.userId !== userId) {
            return res.status(400).send({ message: "You can't delete this comment." });
        };

        return res.status(200).send({ message: "Comment successfully deleted." });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    };
};