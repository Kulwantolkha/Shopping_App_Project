const jwt = require("jsonwebtoken");

// Authentication middleware
function authenticateUser(req, res, next) {
    const token = req.cookies.authorization;
    if (!token) {
        return res.status(401).json({
            isSuccess: false,
            message: "Token Not Found!",
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                isSuccess: false,
                message: "Invalid Token!",
            });
        }
        req.user = decoded; // { _id, email }
        next();
    });
}

module.exports = { authenticateUser };

// app.get("/", (req, res) => {
//     res.json({
//         isSuccess: true,
//         message: "Server is Running.....",
//         data: {},
//     });
// });

// app.get("/hello", (req, res) => {
//     res.json({
//         isSuccess: true,
//         message: "Hi, How are you?",
//         data: {},
//     });
// });

// app.use((req, res, next) => {
//     console.log("!!!!!!");
//     // res.json({
//     //     isSuccess: false,
//     //     message: "Route dosen't match, check your code.",
//     // });
//     next();
// });
