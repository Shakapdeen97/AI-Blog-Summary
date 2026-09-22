import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  FileText,
  WandSparkles,
} from "lucide-react";

import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {

    // ================= NAME VALIDATION =================

    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }


    // ================= EMAIL VALIDATION =================

    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email");
      return;
    }


    // ================= PASSWORD VALIDATION =================

    if (!password.trim()) {
      alert("Please enter your password");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }


    // ================= CONFIRM PASSWORD =================

    if (!confirmPassword.trim()) {
      alert("Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }


    // ================= REGISTER API =================

    try {

      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log(response.data);

      alert("Registration Successful");


      // Clear form

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");


      // Go to Login

      navigate("/login");

    } catch (error) {

      console.log(error);

      if (error.response) {
        alert(
          error.response.data.message ||
          "Registration Failed"
        );
      } else {
        alert("Unable to connect to server");
      }
    }
  };


  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* ================= LEFT SIDE ================= */}

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
          Create Your Account
        </h2>


        <p className="mt-6 text-lg text-gray-200 leading-8">
          Join SummarAI and start creating blogs with
          AI-powered text summarization.
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


      {/* ================= RIGHT SIDE ================= */}

      <div className="flex justify-center items-center bg-gray-100 px-6">

        <div className="bg-white w-full max-w-md shadow-xl rounded-2xl p-8">

          <h1 className="text-3xl font-bold text-center text-slate-800">
            Create Account
          </h1>


          <p className="text-center text-gray-500 mt-2">
            Register to continue
          </p>


          {/* ================= NAME ================= */}

          <div className="mt-6">

            <label className="font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2 outline-none focus:ring-2 focus:ring-sky-600"
            />

          </div>


          {/* ================= EMAIL ================= */}

          <div className="mt-4">

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


          {/* ================= PASSWORD ================= */}

          <div className="mt-4">

            <label className="font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2 outline-none focus:ring-2 focus:ring-sky-600"
            />

          </div>


          {/* ================= CONFIRM PASSWORD ================= */}

          <div className="mt-4">

            <label className="font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2 outline-none focus:ring-2 focus:ring-sky-600"
            />

          </div>


          {/* ================= BUTTON ================= */}

          <button
            onClick={handleRegister}
            className="w-full mt-8 bg-sky-900 text-white py-3 rounded-lg hover:bg-sky-800 transition"
          >
            Create Account
          </button>


          {/* ================= LOGIN ================= */}

          <p className="text-center mt-6">

            Already have an account?

            <Link
              to="/login"
              className="text-sky-700 font-semibold ml-2"
            >
              Sign In
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;