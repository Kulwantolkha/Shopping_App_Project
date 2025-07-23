const { Product } = require("../../../models/product_schema.js");

const createProductController = async (req, res) => {
    try {
        const data = req.body;

        Object.keys(data).forEach((key) => {
            if (data[key] == null || data[key] === "") {
                delete data[key];
            }
        });

        const newProduct = await Product.create(data);

        res.status(201).json({
            isSuccess: true,
            message: "Product created",
            data: { product: newProduct },
        });
    } catch (err) {
        if (err.name === "ValidationError" || err.code == 11000) {
            return res.status(400).json({
                isSuccess: false,
                message: `Validation Error: ${err.message}`,
                data: {},
            });
        }

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();

        res.status(200).json({
            isSuccess: true,
            message: "Product list fetched",
            data: { products: allProducts },
        });
    } catch (err) {
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
    }
};

const updateProductController = async (req, res) => {
    try {
        const { productId } = req.params;
        const newData = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(productId, newData, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid Product ID",
                data: {},
            });
        }

        res.status(200).json({
            isSuccess: true,
            message: "Product updated",
            data: { product: updatedProduct },
        });
    } catch (err) {
        if (err.name === "ValidationError" || err.code == 11000) {
            return res.status(400).json({
                isSuccess: false,
                message: `Validation Error: ${err.message}`,
                data: {},
            });
        }

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
    }
};

const deleteProductController = async (req, res) => {
    try {
        const { productId } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid Product ID",
                data: {},
            });
        }

        res.status(200).json({
            isSuccess: true,
            message: "Product deleted successfully",
            data: { product: deletedProduct },
        });
    } catch (err) {
        if (err.name === "ValidationError" || err.code == 11000) {
            return res.status(400).json({
                isSuccess: false,
                message: `Validation Error: ${err.message}`,
                data: {},
            });
        }

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
    }
};

module.exports = {
    createProductController,
    getAllProducts,
    updateProductController,
    deleteProductController,
};
