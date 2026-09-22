const Blog = require("../models/Blog");


// ================= CREATE BLOG =================

const createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      summary,
      image,
      tags,
      status,
    } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    // Create blog
    const blog = await Blog.create({
      title,
      content,
      summary,
      image,
      tags,
      author: req.user.email,
      status: status || "draft",
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create blog",
      error: error.message,
    });
  }
};


// ================= GET ALL BLOGS =================

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Blogs fetched successfully",
      blogs,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch blogs",
      error: error.message,
    });
  }
};


// ================= GET SINGLE BLOG =================

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json({
      blog,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch blog",
      error: error.message,
    });
  }
};


// ================= UPDATE BLOG =================

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Update fields
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.summary = req.body.summary ?? blog.summary;
    blog.image = req.body.image ?? blog.image;
    blog.tags = req.body.tags ?? blog.tags;
    blog.status = req.body.status || blog.status;

    const updatedBlog = await blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update blog",
      error: error.message,
    });
  }
};


// ================= DELETE BLOG =================

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Blog deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete blog",
      error: error.message,
    });
  }
};


// ================= EXPORT =================

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};