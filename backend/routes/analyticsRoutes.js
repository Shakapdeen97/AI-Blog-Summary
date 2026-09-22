const express = require("express");

const {
  generateSummary,
} = require("../controllers/analyticsController");

const router = express.Router();


// Generate AI Summary
router.post("/summarize", generateSummary);


module.exports = router;