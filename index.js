const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDatabase = require("./src/database/db");

dotenv.config();

const port = process.env.PORT;

const userRoute = require("./src/routes/user.route");

connectDatabase();
app.use(express.json());
app.use("/user", userRoute);

app.listen(port, () => console.log(`Running on: http://localhost:${port}/`));