import { createService, findAllService } from "../services/post.service.js";

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
            user: { _id: "684464670693539dc173b599" },
        });

        res.status(201).send({ message: "Post created successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
};

const findAll = async (req, res) => {
    try {
        const posts = await findAllService();

        if (posts.length === 0) {
            return res.status(400).send({ message: "There are no registred posts." });
        };

        res.status(200).send(posts);
    } catch (err) {
        res.status(400).send({ message: err.message });
    };
};

export { create, findAll };