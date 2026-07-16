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

    const [loading, setLoading] = useState(true);
    const loadDrafts = async () => {

        try {

            const response = await api.get("/blogs");

            const draftBlogs = response.data.filter(
                (blog) => blog.status === "draft"
            );

            setDrafts(draftBlogs.reverse());

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };
    useEffect(() => {

        loadDrafts();

    }, []);
    const handleDelete = async (id) => {

        const ok = window.confirm(
            "Delete this draft?"
        );

        if (!ok) return;

        try {

            await api.delete(`/blogs/${id}`);

            loadDrafts();

        } catch (error) {

            console.log(error);

        }

    };

    const handlePublish = async (draft) => {
        try {

            await api.put(`/blogs/${draft.id}`, {
                ...draft,
                status: "published",
            });

            alert("Published Successfully");

            loadDrafts();

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

        }
    };
    return (
  <div className="min-h-screen bg-gray-100">

    <DashboardNavbar />

    <main className="max-w-7xl mx-auto py-10 px-5">

      <h1 className="text-4xl font-bold">
        Draft Blogs
      </h1>

      <p className="text-gray-500 mt-2">
        Your saved drafts
      </p>

      {loading ? (

        <h2 className="text-center mt-10">
          Loading...
        </h2>

      ) : drafts.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-10 text-center mt-10">

          <FileText size={60} className="mx-auto text-gray-400" />

          <h2 className="text-2xl font-bold mt-4">
            No Drafts Found
          </h2>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

          {drafts.map((draft) => (

            <div
              key={draft.id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >

              <img
                src={draft.image}
                alt={draft.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">

                <h2 className="text-2xl font-bold">
                  {draft.title}
                </h2>

                <p className="mt-3 line-clamp-4">
                  {draft.summary}
                </p>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={() => handlePublish(draft)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg flex justify-center items-center gap-2"
                  >
                    <Send size={18}/>
                    Publish
                  </button>

                  <button
                    onClick={() => handleDelete(draft.id)}
                    className="bg-red-600 text-white p-3 rounded-lg"
                  >
                    <Trash2 size={18}/>
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