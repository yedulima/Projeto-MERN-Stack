import { createService, findAllService, updateService } from "../services/user.service.js";

const create = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name || !username || !email || !password || !avatar || !background) {
            res.status(400).send({ message: "Submit all fields for registration." });
        };

        const user = await createService(req.body);

        res.status(201).json({
            message: "User created successfully!!",
            user: {
                id: user._id,
                name,
                username,
                email,
                avatar,
                background
            },
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
};

const findAll = async (req, res) => {
    try {
        const users = await findAllService();

        if (users.length === 0) {
            return res.status(400).send({ message: "There are no registred users." });
        };

        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
};

const findById = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
};

const update = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name && !username && !email && !password && !avatar && !background) {
            res.status(400).send({ message: "Submit at least one field for update." });
        };

        const { id, user } = req;

        await updateService(
            id,
            name,
            username,
            email,
            password,
            avatar,
            background
        );

        res.status(200).send({ message: "User successfully updated." });
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
};

export default { create, findAll, findById, update };