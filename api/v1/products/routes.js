const express = require("express");
const { createProductController, getAllProducts, updateProductController, deleteProductController } = require("./controllers.js");

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", createProductController);
productRouter.patch("/:productId", updateProductController);
productRouter.delete("/:productId", deleteProductController);

module.exports = productRouter;