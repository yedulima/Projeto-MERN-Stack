import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./src/database/db.js";
import userRoute from "./src/routes/user.route.js";

const app = express();
dotenv.config();

const port = process.env.PORT;

connectDatabase();
app.use(express.json());
app.use("/user", userRoute);

app.listen(port, () => console.log(`Running on: http://localhost:${port}/`));