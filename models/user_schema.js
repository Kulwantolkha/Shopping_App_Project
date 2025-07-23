const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema, model } = mongoose;

// Add cart item schema
const cartItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1,
    },
    // Optionally, you can add product snapshot fields (title, price, etc) here
}, { _id: false });

const userSchema = new Schema(
    {
        Name: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            default: 0,
        },
        gender: {
            type: String,
            required: true,
            enum: ["male", "female"],
        },
        role: {
            type: String,
            enum: ["User", "Admin", "Super-Admin"],
            default: "User",
        },
        cart: {
            type: [cartItemSchema],
            default: [],
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const UserModel = model("user", userSchema);

module.exports = { UserModel };