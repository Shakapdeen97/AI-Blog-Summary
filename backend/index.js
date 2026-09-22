const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load .env FIRST
dotenv.config();

const connectDB = require("./config/dbConnection");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");



// Load environment variables
dotenv.config();


// Create Express app
const app = express();


// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());


// ================= DATABASE =================

connectDB();


// ================= ROUTES =================

// Authentication
app.use("/api/auth", authRoutes);

// Blog
app.use("/api/blogs", blogRoutes);

// Analytics
app.use("/api/analytics", analyticsRoutes);


// ================= TEST API =================

app.get("/", (req, res) => {
  res.json({
    message: "AI Blog Summarizer Backend API is running",
  });
});


// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});