import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    PenSquare,
    Sparkles,
    UserCircle,
    LogOut,
} from "lucide-react";
import api from "../services/api";
import Footer from "../components/Footer";
import DashboardNavbar from "../components/DashboardNavbar.jsx";


function Dashboard() {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All Topics");
    const loadBlogs = async () => {
        try {
            const response = await api.get("/blogs");

            // Latest blog first
            const sortedBlogs = response.data.reverse();

            setBlogs(sortedBlogs);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadBlogs();
    }, []);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("user"));

        if (!loggedUser) {
            navigate("/login");
        } else {
            setUser(loggedUser);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const filteredBlogs = blogs.filter((blog) => {

        const categoryMatch =
            selectedCategory === "All Topics" ||
            blog.tags?.toLowerCase().trim() === selectedCategory.toLowerCase();

        const search = searchTerm.toLowerCase().trim();

        const searchMatch =
            search === "" ||
            blog.title?.toLowerCase().includes(search) ||
            blog.tags?.toLowerCase().includes(search);

        return categoryMatch && searchMatch;
    });

    return (
        <div className="min-h-screen bg-gray-100">
            <DashboardNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <main className="max-w-7xl mx-auto px-8 py-10">

                <div className="mt-10 bg-gradient-to-r from-sky-900 via-sky-800 to-sky-700 rounded-[35px] p-10 shadow-2xl text-white overflow-hidden relative">
                    {/* Background Blur */}
                    <div className="absolute -top-20 -right-20 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10">

                        {/* Top */}
                        <div className="flex justify-between items-start">

                            <div className="flex gap-6">

                                {/* Avatar */}

                                <div className="relative">

                                    <div className="w-20 h-20 rounded-2xl bg-white/20 border border-white/20 flex items-center justify-center text-4xl font-bold">

                                        {user?.name?.charAt(0).toUpperCase()}

                                    </div>

                                    <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-sky-800"></span>
                                </div>

                                {/* User Info */}

                                <div>

                                    <h1 className="text-5xl font-bold leading-tight">
                                        Welcome back,
                                        <br />
                                        {user?.name}!
                                    </h1>

                                    <p className="mt-3 text-blue-100 text-lg">
                                        {user?.email}
                                    </p>

                                </div>

                            </div>

                            {/* Buttons */}

                            <div className="flex gap-4">

                                <button
                                    onClick={() => navigate("/create-blog")}
                                    className="bg-white/10 border border-white/20 px-7 py-3 rounded-2xl hover:bg-white/20 transition"                                >
                                    ✍️ Write New
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="bg-white/10 border border-white/20 px-7 py-3 rounded-2xl hover:bg-white/20 transition"
                                >
                                    Logout
                                </button>

                            </div>

                        </div>

                        {/* Stats */}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

                            <div className="bg-white/10 border border-white/10 backdrop-blur-lg rounded-3xl p-7">

                                <p className="uppercase tracking-widest text-sm text-blue-200">
                                    Articles Read
                                </p>

                                <h2 className="text-5xl font-bold mt-3">
                                    {blogs.filter(b => b.status === "published").length}
                                </h2>

                            </div>

                            <div className="bg-white/10 border border-white/10 backdrop-blur-lg rounded-3xl p-7">

                                <p className="uppercase tracking-widest text-sm text-blue-200">
                                    Drafts
                                </p>

                                <h2 className="text-5xl font-bold mt-3">
                                    {blogs.filter(b => b.status === "draft").length}
                                </h2>

                            </div>

                            <div className="bg-white/10 border border-white/10 backdrop-blur-lg rounded-3xl p-7">

                                <p className="uppercase tracking-widest text-sm text-blue-200">
                                    Saved
                                </p>

                                <h2 className="text-5xl font-bold mt-3">
                                    {blogs.length}
                                </h2>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="mt-20">
                <h1 className="text-4xl font-bold">
                    Browse Articles
                </h1>

                <p className="text-gray-600 mt-2">
                    Explore articles by topic and discover new content.
                </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-3 mt-8">

                    {[
                        "All Topics",
                        "AI",
                        "Technology",
                        "Design",
                        "Programming",
                        "JavaScript",
                        "UI/UX",
                        "Cloud",
                    ].map((item) => (
                        <button
                            key={item}
                            onClick={() => setSelectedCategory(item)}
                            className={`px-4 py-2 rounded-full transition
                                   ${selectedCategory === item
                                    ? "bg-sky-900 text-white"
                                    : "bg-gray-200 text-black hover:bg-gray-300"
                                }`}
                        >
                            {item}
                        </button>
                    ))}

                </div>

                {/* Welcome Card */}
                {/* <div className="mt-10 bg-white rounded-xl shadow-lg p-8">

                    <h2 className="text-3xl font-bold text-sky-900">
                        Welcome, {user?.name} 👋
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Logged in as{" "}
                        <span className="font-semibold">
                            {user?.email}
                        </span>
                    </p>

                    <button
                        onClick={handleLogout}
                        className="mt-8 flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div> */}

                
                {/* Blog Cards */}

                <div className="mt-10">

                    {loading ? (

                        <div className="text-center text-xl font-semibold">
                            Loading Blogs...
                        </div>

                    ) : blogs.length === 0 ? (

                        <div className="bg-white rounded-xl shadow p-10 text-center">

                            <h2 className="text-2xl font-bold text-gray-700">
                                No Blogs Found
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Click the Write button and publish your first blog.
                            </p>

                        </div>

                    ) : (

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {filteredBlogs.map((blog) => (

                                <div
                                    key={blog.id}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                                >

                                    {/* Blog Image */}

                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-52 object-cover"
                                        onError={(e) => {
                                            e.target.src =
                                                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800";
                                        }}
                                    />

                                    {/* Blog Content */}

                                    <div className="p-6">

                                        <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm">
                                            {blog.tags}
                                        </span>

                                        <h2 className="text-2xl font-bold mt-4">
                                            {blog.title}
                                        </h2>

                                        <p className="text-gray-600 mt-3 whitespace-pre-line line-clamp-5">
                                            {blog.summary}
                                        </p>

                                        <div className="flex justify-between items-center mt-6 text-sm text-gray-500">

                                            <span>
                                                👤 {blog.author}
                                            </span>

                                            <span>
                                                📅 {blog.createdAt}
                                            </span>

                                        </div>

                                        <button
                                            onClick={() => navigate(`/blog/${blog.id}`)}
                                            className="mt-6 w-full bg-sky-900 text-white py-3 rounded-lg hover:bg-sky-800"
                                        >
                                            Read More
                                        </button>
                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>
            </main>

            {/* Footer */}

            <Footer />

        </div>
    );
}

export default Dashboard;