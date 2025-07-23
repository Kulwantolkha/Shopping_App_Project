const express = require("express");
const productRouter = require("./products/routes.js");
const authRouter = require("./auth/routes.js");
const userRouter = require("./users/routes.js");

const apiRouter = express.Router();

apiRouter.use("/products", productRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);

module.exports = apiRouter;
