import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./src/database/db.js";
import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import postRoute from "./src/routes/post.route.js";
import swaggerRoute from "./src/routes/swagger.route.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

connectDatabase();
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/post", postRoute);
app.use("/doc", swaggerRoute);

app.listen(port, () => console.log(`Running on: http://localhost:${port}/`));