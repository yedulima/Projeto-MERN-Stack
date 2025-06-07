import { loginService, generateToken } from "../services/auth.service.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await loginService(username);

        if (!user) {
            return res.status(404).send({ message: "Invalid username or password." });
        };

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(404).send({ message: "Invalid username or password." });
        };

        const token = generateToken(user.id);

        res.status(200).send({ token });
    } catch (err) {
        res.status(500).send(err.message);
    };
};

export { login };