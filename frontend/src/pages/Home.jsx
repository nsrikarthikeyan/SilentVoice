import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br 
      from-[#0D0D2B] via-[#1a1a4e] to-[#0D0D2B] 
      flex flex-col items-center justify-center 
      text-white px-6">

      {/* Logo */}
      <div className="text-7xl mb-6 animate-bounce">
        🤟
      </div>

      {/* Title */}
      <h1 className="text-6xl font-bold mb-4 text-center 
        bg-gradient-to-r from-[#6C3FC5] via-[#4A90E2] 
        to-[#00D4AA] bg-clip-text text-transparent">
        SilentVoice
      </h1>

      {/* Tagline */}
      <p className="text-xl text-center mb-2 text-blue-300 
        font-medium">
        The voice they never lost — just spoken differently
      </p>

      <p className="text-center mb-10 text-gray-400 
        max-w-lg text-sm">
        An AI-powered interview platform where speechless 
        candidates perform sign language and HR understands 
        every word — in real time.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mb-16">
        <button
          onClick={() => navigate("/register")}
          className="bg-gradient-to-r from-[#6C3FC5] 
            to-[#4A90E2] text-white font-bold px-8 py-3 
            rounded-full hover:opacity-90 transition 
            shadow-lg shadow-purple-500/30">
          Get Started
        </button>

        <button
          onClick={() => navigate("/login")}
          className="border border-[#6C3FC5] text-white 
            px-8 py-3 rounded-full hover:bg-[#6C3FC5] 
            transition">
          Login
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-8 text-center 
        max-w-2xl">
        <div className="bg-white/5 rounded-2xl p-6 
          border border-white/10">
          <div className="text-4xl mb-3">🎥</div>
          <p className="font-semibold text-sm">
            Live Sign Detection
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Real-time hand gesture recognition
          </p>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 
          border border-white/10">
          <div className="text-4xl mb-3">🧠</div>
          <p className="font-semibold text-sm">
            AI Translation
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Signs converted to natural sentences
          </p>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 
          border border-white/10">
          <div className="text-4xl mb-3">🔊</div>
          <p className="font-semibold text-sm">
            Voice Output
          </p>
          <p className="text-gray-400 text-xs mt-1">
            HR hears candidate answers instantly
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-12 mt-12">
        <div className="text-center">
          <p className="text-3xl font-bold text-[#00D4AA]">
            63M+
          </p>
          <p className="text-gray-400 text-xs">
            Speechless people in India
          </p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-[#4A90E2]">
            0
          </p>
          <p className="text-gray-400 text-xs">
            Platforms solving this
          </p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-[#6C3FC5]">
            100%
          </p>
          <p className="text-gray-400 text-xs">
            Real time translation
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-16 text-gray-600 text-xs">
        Breaking interview barriers for speechless people 🇮🇳
      </p>
    </div>
  );
}