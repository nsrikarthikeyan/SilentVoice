import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email ||
        !formData.password || !formData.role) {
      return setError("Please fill all fields");
    }
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      setLoading(true);
      await register(
        formData.email,
        formData.password,
        formData.name,
        formData.role
      );
      if (formData.role === "candidate") {
        navigate("/candidate");
      } else {
        navigate("/hr");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br
      from-[#0D0D2B] via-[#1a1a4e] to-[#0D0D2B]
      flex items-center justify-center px-4">

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🤟</div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Join SilentVoice
          </h1>
          <p className="text-gray-400 text-sm">
            Create your account to get started
          </p>
        </div>

        <div className="bg-white/5 rounded-2xl p-8
          border border-white/10">

          {error && (
            <div className="bg-red-500/20 border
              border-red-500/50 rounded-xl p-3 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <p className="text-white font-semibold mb-3">
            I am a:
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div
              onClick={() => setFormData({
                ...formData, role: "candidate"
              })}
              className={`p-4 rounded-xl cursor-pointer
                border text-center transition-all ${
                formData.role === "candidate"
                  ? "border-[#6C3FC5] bg-[#6C3FC5]/20"
                  : "border-white/10 hover:border-[#6C3FC5]"
              }`}>
              <div className="text-3xl mb-2">🤟</div>
              <p className="text-white text-sm font-semibold">
                Candidate
              </p>
              <p className="text-gray-400 text-xs">
                Looking for job
              </p>
            </div>

            <div
              onClick={() => setFormData({
                ...formData, role: "hr"
              })}
              className={`p-4 rounded-xl cursor-pointer
                border text-center transition-all ${
                formData.role === "hr"
                  ? "border-[#4A90E2] bg-[#4A90E2]/20"
                  : "border-white/10 hover:border-[#4A90E2]"
              }`}>
              <div className="text-3xl mb-2">👔</div>
              <p className="text-white text-sm font-semibold">
                HR / Manager
              </p>
              <p className="text-gray-400 text-xs">
                Hiring talent
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/10 text-white
                placeholder-gray-500 rounded-xl px-4
                py-3 border border-white/10
                focus:border-[#6C3FC5] focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/10 text-white
                placeholder-gray-500 rounded-xl px-4
                py-3 border border-white/10
                focus:border-[#6C3FC5] focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white/10 text-white
                placeholder-gray-500 rounded-xl px-4
                py-3 border border-white/10
                focus:border-[#6C3FC5] focus:outline-none"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-white/10 text-white
                placeholder-gray-500 rounded-xl px-4
                py-3 border border-white/10
                focus:border-[#6C3FC5] focus:outline-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r
              from-[#6C3FC5] to-[#4A90E2] text-white
              font-bold py-3 rounded-xl hover:opacity-90
              transition disabled:opacity-50">
            {loading ? "Creating Account..." : "Create Account 🚀"}
          </button>

          <p className="text-center text-gray-400
            text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login"
              className="text-[#4A90E2] hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}