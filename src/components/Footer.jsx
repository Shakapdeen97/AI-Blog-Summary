import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-2 gap-10">

          {/* Left */}

          <div>

            <div className="flex items-center gap-3">

              <div className="bg-sky-700 p-2 rounded-lg">

                <Sparkles className="text-white" size={22} />

              </div>

              <h2 className="text-2xl font-bold text-white">

                SummarAI

              </h2>

            </div>

            <p className="mt-4 leading-7">

              AI Powered Blog with Text Summarization.
              Create blogs, generate summaries and manage
              your content efficiently.

            </p>

          </div>

          {/* Right */}

          <div>

            <h2 className="text-xl font-semibold text-white mb-4">

              Quick Links

            </h2>

            <div className="flex flex-col gap-3">

              <Link to="/" className="hover:text-white">

                Home

              </Link>

              <Link to="/login" className="hover:text-white">

                Sign In

              </Link>

              <Link to="/register" className="hover:text-white">

                Register

              </Link>

            </div>

          </div>

        </div>

        <hr className="border-gray-700 my-8" />

        <p className="text-center text-gray-400">

          © 2026 SummarAI. All Rights Reserved.

        </p>

      </div>

    </footer>
  );
}

export default Footer;