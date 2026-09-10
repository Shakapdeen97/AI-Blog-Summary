import FeatureCard from "./FeatureCard";

import {
  Sparkles,
  FileText,
  ShieldCheck,
} from "lucide-react";

function Features() {
  return (
    <section className="bg-gray-100 py-20">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center text-slate-800">

          Why Choose SummarAI?

        </h1>

        <p className="text-center text-gray-600 mt-4 mb-12">

          Everything you need to write, manage and summarize blogs using AI.

        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          <FeatureCard
            icon={<Sparkles size={28} />}
            title="Automatic Summaries"
            description="Generate short AI-powered summaries from long blog posts with a single click."
          />

          <FeatureCard
            icon={<FileText size={28} />}
            title="Rich Blog Editor"
            description="Write beautiful articles with a clean and responsive editor."
          />

          <FeatureCard
            icon={<ShieldCheck size={28} />}
            title="Secure Authentication"
            description="Register, login and manage your blogs securely."
          />

        </div>

      </div>

    </section>
  );
}

export default Features;