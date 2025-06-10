import { findByIdService } from "../services/user.service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).send({ message: "User unauthorized." });
        };

        const parts = authorization.split(" ");

        if (parts.length !== 2) {
            return res.status(401).send({ message: "User unauthorized." });
        };

        const [schema, token] = parts;

        if (schema !== "Bearer") {
            return res.status(401).send({ message: "User unauthorized." });
        };

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if (error) {
                return res.status(401).send({ message: "Invalid token." });
            };

            const user = await findByIdService(decoded.id);

            if (!user || !user.id) {
                return res.status(401).send({ message: "Invalid token." });
            };

            req.userId = user.id;

            return next();
        });

    } catch (err) {
        return res.status(500).send({ message: err.message });
    };
};