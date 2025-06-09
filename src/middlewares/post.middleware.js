import { findByIdService } from "../services/post.service.js";

const validPost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const post = await findByIdService(id);
        
        if (!post) {
            return res.status(400).send({ message: "Post not found." });
        };

        req.post = post;

        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
};



export { validPost };