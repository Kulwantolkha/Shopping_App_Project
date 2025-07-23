const express = require("express");
const { getUserDetailsController } = require("./controllers");
const { authenticateUser } = require("../../../app-middleware");
const {
  getCartController,
  addToCartController,
  updateCartController,
  removeFromCartController,
} = require("./controllers");
const userRouter = express.Router();

userRouter.get("/",authenticateUser, getUserDetailsController);

// Cart endpoints
userRouter.get("/cart", authenticateUser, getCartController);
userRouter.post("/cart", authenticateUser, addToCartController);
userRouter.patch("/cart", authenticateUser, updateCartController);
userRouter.delete("/cart/:productId", authenticateUser, removeFromCartController);

module.exports = userRouter;