const express = require("express");
const { userRegistrationController, userLoginController } = require("./controllers");

const authRouter = express.Router();

authRouter.post("/signup", userRegistrationController);

authRouter.post("/login", userLoginController);

module.exports = authRouter;