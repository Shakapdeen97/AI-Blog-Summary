import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  Calendar,
  User,
  Tag,
  ArrowLeft,
} from "lucide-react";

import api from "../services/api";

import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";


function BlogDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);

  const [loading, setLoading] =
    useState(true);


  // ================= LOAD BLOG =================

const loadBlog = async () => {
  try {
    setLoading(true);

    const response = await api.get(`/blogs/${id}`);

    // Backend returns:
    // { blog: {...} }

    setBlog(response.data.blog);

  } catch (error) {
    console.log("Load Blog Error:", error);

    setBlog(null);

  } finally {
    setLoading(false);
  }
};


  // ================= PAGE LOAD =================

  useEffect(() => {

    loadBlog();

  }, [id]);


  // ================= LOADING =================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">

        Loading...

      </div>

    );
  }


  // ================= NOT FOUND =================

  if (!blog) {

    return (

      <div className="min-h-screen flex flex-col items-center justify-center">

        <h1 className="text-2xl font-bold">
          Blog Not Found
        </h1>


        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="mt-5 bg-sky-900 text-white px-6 py-3 rounded-lg"
        >
          Back to Dashboard
        </button>

      </div>

    );
  }


  return (

    <div className="min-h-screen bg-gray-100">


      <DashboardNavbar />


      <div className="max-w-5xl mx-auto py-10 px-4">


        {/* BACK BUTTON */}

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="flex items-center gap-2 text-sky-900 font-semibold mb-6"
        >

          <ArrowLeft size={20} />

          Back to Dashboard

        </button>


        {/* BLOG CARD */}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">


          {/* IMAGE */}

          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[450px] object-cover"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200";
            }}
          />


          <div className="p-8">


            {/* TAG */}

            <span className="inline-flex items-center bg-sky-100 text-sky-700 px-4 py-1 rounded-full">

              <Tag
                size={14}
                className="mr-2"
              />

              {blog.tags || "General"}

            </span>


            {/* TITLE */}

            <h1 className="text-4xl font-bold mt-6">
              {blog.title}
            </h1>


            {/* AUTHOR */}

            <div className="flex flex-wrap gap-8 mt-5 text-gray-600">


              <div className="flex items-center gap-2">

                <User size={18} />

                {blog.author}

              </div>


              <div className="flex items-center gap-2">

                <Calendar size={18} />

                {blog.createdAt}

              </div>

            </div>


            {/* AI SUMMARY */}

            <div className="mt-10">


              <h2 className="text-2xl font-bold text-sky-900">
                🤖 AI Generated Summary
              </h2>


              <div className="mt-4 bg-sky-50 border border-sky-200 rounded-xl p-6 whitespace-pre-line leading-8">

                {blog.summary ||
                  "No summary available."}

              </div>

            </div>


            {/* FULL ARTICLE */}

            <div className="mt-10">


              <h2 className="text-2xl font-bold text-sky-900">
                📄 Full Article
              </h2>


              <div className="mt-4 text-gray-700 leading-9 whitespace-pre-line text-lg">

                {blog.content}

              </div>

            </div>


            {/* BACK BUTTON */}

            <div className="mt-10">


              <button
                onClick={() =>
                  navigate("/dashboard")
                }
                className="bg-sky-900 hover:bg-sky-800 text-white px-6 py-3 rounded-lg"
              >
                Back to Dashboard
              </button>

            </div>

          </div>

        </div>

      </div>


      <Footer />

    </div>
  );
}


export default BlogDetails;