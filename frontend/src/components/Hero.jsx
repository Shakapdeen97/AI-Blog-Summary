import { useEffect, useState } from "react";
import { Sparkles, ArrowRight, Calendar, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Hero() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= LOAD ALL PUBLISHED BLOGS =================

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await api.get("/blogs");

        console.log("Blogs API Response:", response.data);

        // Backend returns { blogs: [...] }
        const allBlogs = response.data.blogs || [];

        // Show only published blogs
        const publishedBlogs = allBlogs.filter(
          (blog) => blog.status === "published"
        );

        setBlogs(publishedBlogs);
      } catch (error) {
        console.log("Failed to load blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <div>

      {/* ================= HERO SECTION ================= */}

      <section className="bg-gradient-to-r from-sky-950 via-sky-900 to-cyan-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-28">

          <div className="inline-flex items-center gap-2 border border-gray-500 rounded-full px-4 py-2 mb-8">

            <Sparkles size={18} />

            <span className="text-sm">
              AI-powered blog · mini project
            </span>

          </div>

          <h1 className="text-6xl font-bold leading-tight max-w-3xl">
            A blog that summarizes itself.
          </h1>

          <p className="mt-8 text-xl text-gray-300 max-w-2xl leading-9">

            Write full-length posts. SummarAI automatically
            distills each article into a short, shareable
            summary — perfect for busy readers.

          </p>

          <Link to="/login">

            <button className="mt-10 flex items-center gap-3 bg-white text-sky-900 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">

              Get Started

              <ArrowRight size={20} />

            </button>

          </Link>

        </div>

      </section>


      {/* ================= ALL BLOGS ================= */}

      <section className="bg-gray-100 py-16">

        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}

          <div className="text-center">

            <h2 className="text-4xl font-bold text-slate-800">
              Latest Blogs
            </h2>

            <p className="text-gray-500 mt-3">
              Explore articles published by our community
            </p>

          </div>


          {/* Loading */}

          {loading && (

            <div className="text-center mt-12">

              <p className="text-lg text-gray-500">
                Loading blogs...
              </p>

            </div>

          )}


          {/* No Blogs */}

          {!loading && blogs.length === 0 && (

            <div className="text-center mt-12 bg-white rounded-xl p-10 shadow">

              <h3 className="text-2xl font-bold">
                No blogs published yet
              </h3>

              <p className="text-gray-500 mt-2">
                Be the first person to publish a blog.
              </p>

            </div>

          )}


          {/* Blog Cards */}

          {!loading && blogs.length > 0 && (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

              {blogs.map((blog) => (

                <div
                  key={blog._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                >

                  {/* Image */}

                  <img
                    src={
                      blog.image ||
                      "https://picsum.photos/800/400"
                    }
                    alt={blog.title}
                    className="w-full h-52 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://picsum.photos/800/400";
                    }}
                  />


                  {/* Content */}

                  <div className="p-6">

                    {/* Tag */}

                    <span className="inline-block bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm">

                      {blog.tags || "General"}

                    </span>


                    {/* Title */}

                    <h3 className="text-2xl font-bold mt-4 text-slate-800 line-clamp-2">

                      {blog.title}

                    </h3>


                    {/* Summary */}

                    <p className="text-gray-600 mt-3 line-clamp-3">

                      {blog.summary ||
                        blog.content ||
                        "No summary available."}

                    </p>


                    {/* Author + Date */}

                    <div className="flex flex-col gap-2 mt-5 text-sm text-gray-500">

                      <div className="flex items-center gap-2">

                        <User size={16} />

                        <span>
                          {blog.author || "Unknown Author"}
                        </span>

                      </div>


                      <div className="flex items-center gap-2">

                        <Calendar size={16} />

                        <span>
                          {blog.createdAt || "No date"}
                        </span>

                      </div>

                    </div>


                    {/* Read More */}

                    <button
                      onClick={() =>
                        navigate(`/blog/${blog._id}`)
                      }
                      className="mt-6 w-full bg-sky-900 hover:bg-sky-800 text-white py-3 rounded-lg font-semibold transition"
                    >

                      Read Article

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default Hero;