const userService = require("../services/user.service");
const mongoose = require("mongoose");

const validId = (req, res, next) => {
    const id = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid ID." });
    };

    req.id = id;

    next();
};

const validUser = async (req, res, next) => {
    const id = req.params.id;
    const user = await userService.findByIdService(id);
    
    if (!user) {
        return res.status(400).send({ message: "User not found." });
    };

    req.user = user;

    next();
};

module.exports = { validId, validUser };