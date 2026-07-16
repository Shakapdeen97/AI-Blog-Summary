import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-sky-950 via-sky-900 to-cyan-700 text-white">

      <div className="max-w-7xl mx-auto px-6 py-28">

        

        <div className="inline-flex items-center gap-2 border border-gray-500 rounded-full px-4 py-2 mb-8">

          <Sparkles size={18} />

          <span className="text-sm">
            AI-powered blog · mini project
          </span>

        </div>

        {/* Heading */}

        <h1 className="text-6xl font-bold leading-tight max-w-3xl">

          A blog that summarizes itself.

        </h1>

        {/* Paragraph */}

        <p className="mt-8 text-xl text-gray-300 max-w-2xl leading-9">

          Write full-length posts. SummarAI automatically
          distills each article into a short, shareable
          summary — perfect for busy readers.

        </p>

        {/* Button */}

        <Link to="/login">

          <button className="mt-10 flex items-center gap-3 bg-white text-sky-900 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">

            Get Started

            <ArrowRight size={20} />

          </button>

        </Link>

      </div>

    </section>
  );
}

export default Hero;