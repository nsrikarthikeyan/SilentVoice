import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login, userData } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      return setError("Please fill all fields");
    }

    try {
      setLoading(true);
      await login(formData.email, formData.password);
      if (userData?.role === "candidate") {
        navigate("/candidate");
      } else {
        navigate("/hr");
      }
    } catch (err) {
      setError("Invalid email or password");
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
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm">
            Login to your SilentVoice account
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

          <div className="space-y-4">
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
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r
              from-[#6C3FC5] to-[#4A90E2] text-white
              font-bold py-3 rounded-xl hover:opacity-90
              transition disabled:opacity-50">
            {loading ? "Logging in..." : "Login 🚀"}
          </button>

          <p className="text-center text-gray-400
            text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/register"
              className="text-[#4A90E2] hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}