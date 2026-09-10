import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Save,
  SendHorizontal,
} from "lucide-react";
import groq from "../services/groq";

import api from "../services/api";


import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";

function CreateBlog() {

  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= AI SUMMARY =================

  //   const generateSummary = async () => {
  //   if (!content.trim()) {
  //     alert("Please enter blog content");
  //     return;
  //   }

  //   try {
  //     const completion = await groq.chat.completions.create({
  //       model: "llama-3.3-70b-versatile",
  //       messages: [
  //         {
  //           role: "user",
  //           content: `
  // Summarize the following blog into important bullet points.

  // ${content}

  // Return only bullet points.
  // `,
  //         },
  //       ],
  //     });

  //     setSummary(completion.choices[0].message.content);
  //   } catch (error) {
  //     console.log(error);
  //     alert("Failed to Generate Summary");
  //   }
  // };
  const generateSummary = async () => {
    if (!content.trim()) {
      alert("Please enter blog content");
      return;
    }

    try {
      setLoading(true);

      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `
Summarize the following blog into important bullet points.

${content}

Return only bullet points.
`,
          },
        ],
      });

      setSummary(completion.choices[0].message.content);

    } catch (error) {
      console.log(error);
      alert("Failed to Generate Summary");
    } finally {
      setLoading(false);
    }
  };

  // ================= PUBLISH BLOG =================

  const handlePublish = async () => {

    if (!title.trim()) {
      alert("Please enter title");
      return;
    }

    if (!content.trim()) {
      alert("Please enter content");
      return;
    }

    if (!summary.trim()) {
      alert("Please generate summary");
      return;
    }

    if (!image.trim()) {
      alert("Please enter Image URL");
      return;
    }

    try {

      const loggedUser = JSON.parse(
        localStorage.getItem("user")
      );

      const blogData = {
        title,
        content,
        summary,
        tags,
        image: image,
        author: loggedUser.name,
        userId: loggedUser.id,
        createdAt: new Date().toLocaleDateString(),
        status: "published",
      };

      await api.post("/blogs", blogData);

      alert("Blog Published Successfully");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Failed to Publish Blog");

    }

  };

  const handleSaveDraft = async () => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const blogData = {
      title,
      content,
      summary,
      tags,
      image: image,
      author: loggedUser.name,
      userId: loggedUser.id,
      createdAt: new Date().toLocaleDateString(),
      status: "draft",
    };

    await api.post("/blogs", blogData);

    alert("Draft Saved");

    navigate("/draft");
  };

  return (

    <div className="min-h-screen bg-gray-100">

      <DashboardNavbar />

      <div className="max-w-5xl mx-auto py-10 px-4">

        <h1 className="text-4xl font-bold">
          Write New Article
        </h1>

        <p className="text-gray-500 mt-2">
          Create engaging content and let AI generate summary.
        </p>

        <div className="bg-white mt-8 rounded-xl shadow p-8">

          {/* Title */}

          <label className="font-semibold">
            Title
          </label>

          <input
            type="text"
            placeholder="Enter article title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border mt-2 rounded-lg p-3"
          />

          {/* Content */}

          <label className="font-semibold block mt-8">
            Content
          </label>

          <textarea
            rows="12"
            placeholder="Start writing your article..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border mt-2 rounded-lg p-3 resize-none"
          />

          {/* AI Summary */}

          <div className="flex justify-between items-center mt-8">

            <div>

              <h2 className="font-bold text-xl">
                AI Summary
              </h2>

              <p className="text-gray-500">
                Generate AI-powered summary
              </p>

            </div>

            <button
              onClick={generateSummary}
              disabled={loading}
              className="bg-sky-900 hover:bg-sky-800 text-white px-5 py-3 rounded-lg flex items-center gap-2 disabled:bg-sky-800"
            >

              <Sparkles size={18} />

              {loading ? "Generating..." : "Generate Summary"}

            </button>

          </div>

          <textarea
            rows="8"
            value={summary}
            readOnly
            placeholder="AI generated summary will appear here..."
            className="w-full border rounded-lg p-3 mt-4 bg-gray-50"
          />

          {/* Tags */}

          <label className="font-semibold block mt-8">
            Tags
          </label>

          <input
            type="text"
            placeholder="AI, React, JavaScript"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border rounded-lg mt-2 p-3"
          />

          {/* Image URL */}

          <label className="font-semibold block mt-8">
            Blog Image URL
          </label>

          <input
            type="text"
            placeholder="Paste image URL..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border rounded-lg mt-2 p-3"
          />

          {image && (
            <div className="mt-4">
              <p className="font-medium mb-2">Image Preview</p>

              <img
                src={image}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg border"
                onError={(e) => {
                  e.target.src =
                    "https://picsum.photos/800/400";
                }}
              />
            </div>
          )}

        </div>

        {/* Bottom Buttons */}

        <div className="bg-white rounded-xl shadow p-6 mt-8 flex justify-between">

          <button
            onClick={() => navigate("/dashboard")}
            className="font-semibold"
          >
            Cancel
          </button>

          <div className="flex gap-4">

            <button
              onClick={handleSaveDraft}
              className="border px-5 py-3 rounded-lg flex items-center gap-2"
            >

              <Save size={18} />

              Save Draft

            </button>

            <button
              onClick={handlePublish}
              className="bg-sky-900 hover:bg-sky-800 text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >

              <SendHorizontal size={18} />

              Publish

            </button>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default CreateBlog;