const dotEnv = require("dotenv");
dotEnv.config();

const express = require("express");
const path = require("path");
require("./config/db");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const apiRouter = require("./api/v1/routes.js");

const app = express();

const allowedOrigins = [
    process.env.CLIENT_URL_LOCAL,
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", apiRouter);

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/frontend/dist")));
    app.use(express.static(path.join(__dirname, "frontend", "dist", "index.html")));
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use((req, res, next) => {
    console.log("--------------------------------");
    console.log(new Date(), req.method, req.url);
    console.log("--------------------------------");
    next();
});

const port = process.env.PORT || 2400;

app.listen(port, () => {
    console.log("------ Server is running --------");
});