import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-white/5 border-b border-white/10 
      px-6 py-4 flex items-center justify-between">

      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}>
        <span className="text-2xl">🤟</span>
        <span className="text-white font-bold text-xl">
          SilentVoice
        </span>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-white text-sm font-semibold">
            {userData?.name}
          </p>
          <p className="text-gray-400 text-xs capitalize">
            {userData?.role === "candidate" ? "🤟 Candidate" : "👔 HR Manager"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500/20 text-red-400 
            border border-red-500/30 px-4 py-2 
            rounded-xl text-sm hover:bg-red-500/30 
            transition">
          Logout
        </button>
      </div>
    </nav>
  );
}