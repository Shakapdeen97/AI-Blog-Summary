const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authenticationRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();


// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());


// ================= DATABASE =================

connectDB();


// ================= ROUTES =================

app.use("/api/auth", authenticationRoutes);


// ================= TEST API =================

app.get("/", (req, res) => {
  res.json({
    message: "AI Blog Summarizer Backend is running",
  });
});


// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});