const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
const SECRET = "mysecretkey";

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

/* ---------------- GET USERS ---------------- */
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

/* ---------------- LOGIN (JWT) ---------------- */
app.post("/login", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });

  res.json({ token });
});

/* ---------------- VERIFY TOKEN ---------------- */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

/* ---------------- PROTECTED ROUTE ---------------- */
app.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Protected data",
    user: req.user
  });
});

/* ---------------- SERVER ---------------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});