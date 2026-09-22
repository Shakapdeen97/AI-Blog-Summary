const express = require("express");

const router = express.Router();

const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");


// ================= BLOG ROUTES =================


// Create Blog
router.post(
  "/",
  authMiddleware,
  createBlog
);


// Get All Blogs
// router.get("/",authMiddleware,getBlogs);

// Get ALL Blogs
router.get(
  "/",
  getBlogs
);


// Get Single Blog
router.get(
  "/:id",
  authMiddleware,
  getBlogById
);


// Update Blog
router.patch(
  "/:id",
  authMiddleware,
  updateBlog
);


// Delete Blog
router.delete(
  "/:id",
  authMiddleware,
  deleteBlog
);


module.exports = router;