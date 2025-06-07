import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = () => {
    console.log("Wait we're trying to connect to the database...");

    mongoose.connect(
        process.env.DB_URL,
    )
    .then(() => console.log("MongoDB Atlas connected."))
    .catch((error) => console.log(error));
};

export default connectDatabase;