import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Trash2,
  Send,
  FileText,
} from "lucide-react";

import api from "../services/api";

import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";


function Draft() {

  const navigate = useNavigate();

  const [drafts, setDrafts] = useState([]);

  const [loading, setLoading] =
    useState(true);


  // ================= LOAD DRAFTS =================

  const loadDrafts = async () => {
  try {
    setLoading(true);

    const response = await api.get("/blogs");

    // Backend returns:
    // response.data.blogs

    const blogsData = response.data.blogs || [];

    // Only draft blogs
    const draftBlogs = blogsData.filter(
      (blog) => blog.status === "draft"
    );

    // Latest draft first
    setDrafts([...draftBlogs].reverse());

  } catch (error) {
    console.log("Load Drafts Error:", error);

    if (error.response) {
      console.log(error.response.data);
    }

  } finally {
    setLoading(false);
  }
};


  // ================= PAGE LOAD =================

  useEffect(() => {

    loadDrafts();

  }, []);


  // ================= DELETE DRAFT =================

  const handleDelete = async (id) => {

    const ok = window.confirm(
      "Delete this draft?"
    );

    if (!ok) return;


    try {

      await api.delete(
        `/blogs/${id}`
      );


      alert("Draft Deleted");


      loadDrafts();

    } catch (error) {

      console.log(error);


      if (error.response) {

        alert(
          error.response.data.message ||
          "Failed to delete draft"
        );

      } else {

        alert(
          "Unable to connect to server"
        );

      }

    }
  };


  // ================= PUBLISH DRAFT =================

  const handlePublish = async (draft) => {

    try {

      const updatedBlog = {

        title: draft.title,

        content: draft.content,

        summary: draft.summary,

        tags: draft.tags,

        image: draft.image,

        author: draft.author,

        userId: draft.userId,

        createdAt: draft.createdAt,

        status: "published",

      };


      await api.patch(
        `/blogs/${draft._id}`,
        updatedBlog
      );


      alert(
        "Published Successfully"
      );


      loadDrafts();


      navigate("/dashboard");

    } catch (error) {

      console.log(error);


      if (error.response) {

        alert(
          error.response.data.message ||
          "Failed to publish draft"
        );

      } else {

        alert(
          "Unable to connect to server"
        );

      }

    }
  };


  return (

    <div className="min-h-screen bg-gray-100">


      <DashboardNavbar />


      <main className="max-w-7xl mx-auto py-10 px-5">


        {/* HEADER */}

        <h1 className="text-4xl font-bold">
          Draft Blogs
        </h1>


        <p className="text-gray-500 mt-2">
          Your saved drafts
        </p>


        {/* ================= LOADING ================= */}

        {loading ? (

          <h2 className="text-center mt-10 text-xl font-semibold">
            Loading...
          </h2>


        ) : drafts.length === 0 ? (


          /* ================= NO DRAFTS ================= */

          <div className="bg-white rounded-xl shadow p-10 text-center mt-10">

            <FileText
              size={60}
              className="mx-auto text-gray-400"
            />


            <h2 className="text-2xl font-bold mt-4">
              No Drafts Found
            </h2>


            <p className="text-gray-500 mt-2">
              Save an article as draft to see it here.
            </p>


            <button
              onClick={() =>
                navigate("/create-blog")
              }
              className="mt-6 bg-sky-900 text-white px-6 py-3 rounded-lg hover:bg-sky-800"
            >
              Create New Blog
            </button>

          </div>


        ) : (


          /* ================= DRAFT CARDS ================= */

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">


            {drafts.map((draft) => (

              <div
                key={draft._id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >


                {/* IMAGE */}

                <img
                  src={
                    draft.image ||
                    "https://picsum.photos/800/400"
                  }
                  alt={draft.title}
                  className="w-full h-52 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://picsum.photos/800/400";
                  }}
                />


                {/* CONTENT */}

                <div className="p-5">


                  <span className="inline-block bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm">
                    Draft
                  </span>


                  <h2 className="text-2xl font-bold mt-3">
                    {draft.title ||
                      "Untitled Draft"}
                  </h2>


                  <p className="mt-3 text-gray-600 line-clamp-4">
                    {draft.summary ||
                      draft.content ||
                      "No content available"}
                  </p>


                  {/* DATE */}

                  <p className="text-sm text-gray-500 mt-4">
                    {draft.createdAt}
                  </p>


                  {/* BUTTONS */}

                  <div className="flex gap-3 mt-6">


                    {/* PUBLISH */}

                    <button
                      onClick={() =>
                        handlePublish(draft)
                      }
                      className="flex-1 bg-sky-700 hover:bg-sky-600 text-white py-2 rounded-lg flex justify-center items-center gap-2"
                    >

                      <Send size={18} />

                      Publish

                    </button>


                    {/* DELETE */}

                    <button
                      onClick={() =>
                        handleDelete(
                          draft._id
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg"
                    >

                      <Trash2 size={18} />

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>


      <Footer />

    </div>
  );
}


export default Draft;