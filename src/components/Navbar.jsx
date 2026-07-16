import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link to="/" className="flex items-center gap-3">

          <div className="bg-sky-800 p-2 rounded-lg">

            <Sparkles className="text-white" size={22} />

          </div>

          <h1 className="text-2xl font-bold text-slate-800">
            SummarAI
          </h1>

        </Link>

        {/* Button */}

        <Link to="/login">

          <button className="bg-sky-900 text-white px-5 py-2 rounded-lg hover:bg-sky-800 transition">
            Sign In
          </button>

        </Link>

      </div>
    </nav>
  );
}

export default Navbar;