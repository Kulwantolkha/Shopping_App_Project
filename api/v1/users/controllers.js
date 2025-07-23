const jwt = require("jsonwebtoken");
const { UserModel } = require("../../../models/user_schema");

const getUserDetailsController = async (request, response) => {
    try {
        const { authorization } = request.cookies;
        if (!authorization) {
            return response.status(401).json({
                isSuccess: false,
                message: "Token Not Found!",
            });
        }
        jwt.verify(authorization, process.env.JWT_SECRET, function (err, decodedData) {
            if (err) {
                return response.status(401).json({
                    isSuccess: false,
                    message: "Invalid Token!",
                    data: {},
                });
            } else {
                return response.status(200).json({
                    isSuccess: true,
                    message: "Valid Token!",
                    data: {
                        user: decodedData,
                    },
                });
            }
        });
    } catch (err) {
        console.log("Error in getUserDetailsController ---> ", err.message);
        return response.status(500).json({
            isSuccess: false,
            message: "Internal Server Error!",
            data: {
                message: err.message,
            }
        });
    }
};

// --- CART CONTROLLERS ---

// GET /cart
const getCartController = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id).populate("cart.productId");
        if (!user) return res.status(404).json({ isSuccess: false, message: "User not found" });
        res.json({ isSuccess: true, cart: user.cart });
    } catch (err) {
        res.status(500).json({ isSuccess: false, message: err.message });
    }
};

// POST /cart
const addToCartController = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        if (!productId) return res.status(400).json({ isSuccess: false, message: "productId required" });
        const user = await UserModel.findById(req.user._id);
        if (!user) return res.status(404).json({ isSuccess: false, message: "User not found" });
        const existing = user.cart.find(item => item.productId.toString() === productId);
        if (existing) {
            existing.quantity += quantity;
        } else {
            user.cart.push({ productId, quantity });
        }
        await user.save();
        res.json({ isSuccess: true, cart: user.cart });
    } catch (err) {
        res.status(500).json({ isSuccess: false, message: err.message });
    }
};

// PATCH /cart
const updateCartController = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        if (!productId || typeof quantity !== "number") return res.status(400).json({ isSuccess: false, message: "productId and quantity required" });
        const user = await UserModel.findById(req.user._id);
        if (!user) return res.status(404).json({ isSuccess: false, message: "User not found" });
        const item = user.cart.find(item => item.productId.toString() === productId);
        if (!item) return res.status(404).json({ isSuccess: false, message: "Product not in cart" });
        item.quantity = quantity;
        await user.save();
        res.json({ isSuccess: true, cart: user.cart });
    } catch (err) {
        res.status(500).json({ isSuccess: false, message: err.message });
    }
};

// DELETE /cart/:productId
const removeFromCartController = async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await UserModel.findById(req.user._id);
        if (!user) return res.status(404).json({ isSuccess: false, message: "User not found" });
        user.cart = user.cart.filter(item => item.productId.toString() !== productId);
        await user.save();
        res.json({ isSuccess: true, cart: user.cart });
    } catch (err) {
        res.status(500).json({ isSuccess: false, message: err.message });
    }
};

module.exports = { getUserDetailsController, getCartController, addToCartController, updateCartController, removeFromCartController };