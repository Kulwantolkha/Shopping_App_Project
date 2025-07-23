const { UserModel } = require("../../../models/user_schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegistrationController = async (request, response) => {
    try {
        const data = request.body;
        if (!data.email || !data.password) {
            //add more validation like regex check for email
            response.status(400).json({
                isSuccess: false,
                message: "Email and Passwors is Required!",
                data: {},
            });
            return; //Never forget to write return in these cases 
        }

        const newUser = await UserModel.create(data);

        console.log(" => ", newUser._doc);
        const { password, ...safeData } = newUser._doc;
        console.log(" => ", safeData);

        response.status(201).json({
            isSuccess: true,
            message: "User Created!",
            data: {
                user: newUser,
            },
        });
    } catch (err) {
        if (err.name === "ValidationError" || err.code == "11000") {
            response.status(400).json({ isSuccess: false, message: `Err: ${err.message}`, data: {} });
        }
        console.log("🔴 Error in createProductController", err.message);
        response.status(500).json({ isSuccess: false, message: "Internal Server Error", data: {} });
    }
};

const userLoginController = async (request, response) => {
    try {
        const data = request.body;
        if (!data.email || !data.password) {
            response.status(400).json({
                isSuccess: false,
                message: "Email and password required",
                data: {},
            });
        }
        const user = await UserModel.findOne({
            email: data.email,
        });
        if (user === null) {
            response.status(400).json({
                isSuccess: false,
                message: "User dosen't exists! Please Register...",
                data: {},
            });
        }

        const hashedPassword = user.password;
        const isCorrect = await bcrypt.compare(data.password, hashedPassword);

        if (!isCorrect) {
            response.status(400).json({
                isSuccess: false,
                message: "Password Incorrect",
                data: {},
            });
            return;
        }

        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET);

        response.cookie("authorization", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: "strict",
        });

        response.status(200);
        response.json({
            isSuccess: true,
            message: "Login Successful",
            data: {
                user: {
                    email: user.email,
                },
            },
        });
    }
    catch (err) {
        console.log(err);
    }
};

module.exports = { userRegistrationController, userLoginController };