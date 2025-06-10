import { createService, findAllService, updateService } from "../services/user.service.js";

export const create = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name || !username || !email || !password || !avatar || !background) {
            return res.status(400).send({ message: "Submit all fields for registration." });
        };

        const user = await createService(req.body);

        return res.status(201).json({
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
        return res.status(500).send({ message: err.message });
    };
};

export const findAll = async (req, res) => {
    try {
        const users = await findAllService();

        if (users.length === 0) {
            return res.status(400).send({ message: "There are no registred users." });
        };

        return res.status(200).send(users);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    };
};

export const findById = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    };
};

export const update = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name && !username && !email && !password && !avatar && !background) {
            return res.status(400).send({ message: "Submit at least one field for update." });
        };

        const { id } = req;

        await updateService(
            id,
            name,
            username,
            email,
            password,
            avatar,
            background
        );

        return res.status(200).send({ message: "User successfully updated." });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    };
};