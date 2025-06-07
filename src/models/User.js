import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    avatar: {
        type: String,
        required: true,
    },
    background: {
        type: String,
        required: true,
    },
});

UserSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();

    if (update.password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(update.password, salt);
        update.password = hash;
        this.setUpdate(update);
    };

    next();
});

const User = mongoose.model("User", UserSchema);

export default User;