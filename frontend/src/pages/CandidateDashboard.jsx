import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import VoiceSelector from "../components/VoiceSelector";

export default function CandidateDashboard() {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [error, setError] = useState("");

  const handleJoinInterview = () => {
    if (!roomId.trim()) {
      return setError("Please enter a Room ID");
    }
    if (!selectedVoice) {
      return setError("Please select your voice first");
    }
    // Save voice to localStorage
    localStorage.setItem(
      "selectedVoice",
      JSON.stringify(selectedVoice)
    );
    navigate(`/interview/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-[#0D0D2B]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome, {userData?.name}! 🤟
          </h1>
          <p className="text-gray-400">
            Ready for your interview? Set up your voice 
            and join your interview room.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Join Interview */}
          <div className="bg-white/5 rounded-2xl p-6 
            border border-white/10">

            <h2 className="text-xl font-bold text-white mb-2">
              🚪 Join Interview Room
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Enter the Room ID shared by HR
            </p>

            {error && (
              <div className="bg-red-500/20 border 
                border-red-500/50 rounded-xl p-3 mb-4">
                <p className="text-red-400 text-sm">
                  {error}
                </p>
              </div>
            )}

            <input
              type="text"
              placeholder="Enter Room ID (e.g. ABC123)"
              value={roomId}
              onChange={(e) => {
                setRoomId(e.target.value);
                setError("");
              }}
              className="w-full bg-white/10 text-white
                placeholder-gray-500 rounded-xl px-4
                py-3 border border-white/10
                focus:border-[#6C3FC5] focus:outline-none
                mb-4"
            />

            <button
              onClick={handleJoinInterview}
              className="w-full bg-gradient-to-r
                from-[#6C3FC5] to-[#4A90E2] text-white
                font-bold py-3 rounded-xl
                hover:opacity-90 transition">
              Join Interview 🚀
            </button>
          </div>

          {/* Tips */}
          <div className="bg-white/5 rounded-2xl p-6 
            border border-white/10">

            <h2 className="text-xl font-bold text-white mb-4">
              💡 Interview Tips
            </h2>

            <div className="space-y-3">
              {[
                {
                  icon: "💡",
                  tip: "Make sure your hands are clearly visible to the camera"
                },
                {
                  icon: "💡",
                  tip: "Sign slowly and clearly for best AI translation"
                },
                {
                  icon: "💡",
                  tip: "Good lighting helps improve sign detection accuracy"
                },
                {
                  icon: "💡",
                  tip: "Pause for 3 seconds between answers"
                },
                {
                  icon: "💡",
                  tip: "Test your voice before joining the interview"
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span>{item.icon}</span>
                  <p className="text-gray-400 text-sm">
                    {item.tip}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Voice Selector */}
          <div className="md:col-span-2">
            <VoiceSelector onVoiceSelect={setSelectedVoice} />
          </div>

          {/* Stats */}
          <div className="md:col-span-2 grid 
            grid-cols-3 gap-4">
            {[
              {
                icon: "🎯",
                label: "Interviews Taken",
                value: "0"
              },
              {
                icon: "⭐",
                label: "Average Score",
                value: "N/A"
              },
              {
                icon: "📋",
                label: "Transcripts Saved",
                value: "0"
              },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 
                rounded-2xl p-6 border border-white/10 
                text-center">
                <div className="text-3xl mb-2">
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold 
                  text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-gray-400 text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}