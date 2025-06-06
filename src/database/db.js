const mongoose = require("mongoose");

const connectDatabase = () => {
    console.log("Wait we're trying to connect to the database...");

    mongoose.connect(
        "mongodb+srv://root:root@cluster0.urt2uky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        { useNewUrlParser: true, useUnifiedTopology: true, }
    )
    .then(() => console.log("MongoDB Atlas connected."))
    .catch((error) => console.log(error));
};

module.exports = connectDatabase;