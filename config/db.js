const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB_URL, {
    dbName: "Day17",
}).then(() => {
    console.log("------ ✅ Database Connected ------");
}).catch((err) => {
    console.log("------ 🔴 Database Connection error ------");
    console.log(err.message);
});