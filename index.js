const express = require("express");
const app = express();
const connectDatabase = require("./src/database/db");

const port = 3000;

const userRoute = require("./src/routes/user.route");

connectDatabase();
app.use(express.json());
app.use("/user", userRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}\nhttp://localhost:${port}/`));