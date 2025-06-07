import mongoose from "mongoose";

const connectDatabase = () => {
    console.log("Wait we're trying to connect to the database...");

    mongoose.connect(
        process.env.DB_URL,
    )
    .then(() => console.log("MongoDB Atlas connected."))
    .catch((error) => console.log(error));
};

export default connectDatabase;