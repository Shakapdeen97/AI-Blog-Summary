import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  PenSquare,
  UserCircle,
  Sparkles,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

function DashboardNavbar({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));


  return (
    <header className="bg-white shadow">

      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}

        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 cursor-pointer"
        >

          <div className="bg-sky-800 p-2 rounded-lg">

            <Sparkles className="text-white" size={22} />

          </div>

          <h1 className="text-2xl font-bold text-slate-800">
            SummarAI
          </h1>

        </div>

        {/* Search */}

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-sky-900 hover:bg-sky-800 text-white px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <div className="hidden md:flex items-center border rounded-lg px-3 py-2 w-[400px]">
            <Search size={18} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none ml-2 w-full"
            />
          </div>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-4">

          {/* Write Button */}
          {/* <button
            onClick={() => navigate("/create-blog")}
            className="bg-sky-800 hover:bg-sky-900 text-white px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <PenSquare size={18} />
            Write
          </button> */}

          {/* Draft Button */}
          <button
            onClick={() => navigate("/draft")}
            className="bg-sky-800 hover:bg-sky-900 text-white px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <LayoutDashboard size={18} />
            Drafts
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2">
            <UserCircle
              size={35}
              className="text-slate-700"
            />

            <span className="font-semibold">
              {user?.name}
            </span>
          </div>

        </div>

      </div>

    </header>
  );
}

export default DashboardNavbar;