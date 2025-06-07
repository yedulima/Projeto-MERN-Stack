const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDatabase = () => {
    console.log("Wait we're trying to connect to the database...");

    mongoose.connect(
        process.env.DB_URL,
        { useNewUrlParser: true, useUnifiedTopology: true, }
    )
    .then(() => console.log("MongoDB Atlas connected."))
    .catch((error) => console.log(error));
};

module.exports = connectDatabase;