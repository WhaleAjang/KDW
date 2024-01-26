const express = require("express");
const path = require("path");

const app = express();

// const port = 8080;
const port = process.env.PORT;
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

//const HOST = "0.0.0.0";

const connectWithRetry = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB Connected..."))
        .catch((err) => {
            console.error(
                "Failed to connect to MongoDB. Retrying in 5 seconds...",
                err
            );
            setTimeout(connectWithRetry, 5000);
        });
};

// Call connectWithRetry here
connectWithRetry();
app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
    setImmediate(() => {
        next(new Error("BROKEN"));
    });
    //throw new Error("it is an error");
});
app.get("/test", (req, res, next) => {
    console.log(req);
    res.json({ test: "test1" });
    return res.status(200);
    //throw new Error("it is an error");
});

app.post("/", (req, res) => {
    console.log(req.body);
    res.json({ test: "test2" });
});

app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send(error.message || "Internal Server00 Error");
});
app.use(express.static(path.join(__dirname, "../uploads")));

// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);
app.listen(port, () => console.log(`Listening on port ${port}`));
