import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  ShieldCheck,
  FileText,
  WandSparkles,
} from "lucide-react";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  //
  const handleLogin = async () => {

    if (!email.trim()) {
      alert("Please enter email");
      return;
    }

    if (!password.trim()) {
      alert("Please enter password");
      return;
    }

    try {

      const response = await api.get("/users");

      const user = response.data.find(
        (u) =>
          u.email === email &&
          u.password === password
      );

      if (!user) {
        alert("Invalid Email or Password");
        return;
      }

      // Save logged in user
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }

  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-700 text-white px-16">

        <div className="flex items-center gap-3 mb-8">

          <div className="bg-white/20 p-3 rounded-xl">
            <Sparkles size={28} />
          </div>

          <h1 className="text-3xl font-bold">
            SummarAI
          </h1>

        </div>

        <h2 className="text-5xl font-bold leading-tight">
          Welcome Back
        </h2>

        <p className="mt-6 text-lg text-gray-200 leading-8">
          Sign in to continue writing blogs,
          generating AI summaries and managing
          your content.
        </p>

        <div className="mt-10 space-y-6">

          <div className="flex items-center gap-4">
            <WandSparkles />
            <span>AI Text Summarization</span>
          </div>

          <div className="flex items-center gap-4">
            <FileText />
            <span>Create & Manage Blogs</span>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheck />
            <span>Secure Authentication</span>
          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex justify-center items-center bg-gray-100 px-6">

        <div className="bg-white w-full max-w-md shadow-xl rounded-2xl p-8">

          <h1 className="text-3xl font-bold text-center text-slate-800">
            Sign In
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Login to your account
          </p>

          {/* Email */}

          <div className="mt-8">

            <label className="font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2 outline-none focus:ring-2 focus:ring-sky-600"
            />

          </div>

          {/* Password */}

          <div className="mt-5">

            <label className="font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2 outline-none focus:ring-2 focus:ring-sky-600"
            />

          </div>

          {/* Remember */}

          <div className="flex justify-between items-center mt-5">

            <label className="flex items-center gap-2">

              <input type="checkbox" />

              Remember Me

            </label>

            <button className="text-sky-700 font-medium">
              Forgot Password?
            </button>

          </div>

          {/* Button */}

          <button
            onClick={handleLogin}
            className="w-full mt-8 bg-sky-900 text-white py-3 rounded-lg hover:bg-sky-800 transition"
          >
            Sign In
          </button>

          {/* Bottom */}

          <p className="text-center mt-6">

            Don't have an account?

            <Link
              to="/register"
              className="text-sky-700 font-semibold ml-2"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;