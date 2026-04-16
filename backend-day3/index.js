const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

/* ---------------- MongoDB Connection ---------------- */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("DB Error:", err));

/* ---------------- Schema ---------------- */
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    isDeleted: { type: Boolean, default: false }
});

const User = mongoose.model("User", userSchema);

/* ---------------- CREATE USER ---------------- */
app.post("/users", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

/* ---------------- GET USERS (ACTIVE ONLY) ---------------- */
app.get("/users", async (req, res) => {
    try {
        const users = await User.find({ isDeleted: false });
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

/* ---------------- UPDATE USER ---------------- */
app.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

/* ---------------- SOFT DELETE ---------------- */
app.delete("/users/:id", async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {
            isDeleted: true
        });

        res.json({ message: "User soft deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

/* ---------------- SERVER START ---------------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});