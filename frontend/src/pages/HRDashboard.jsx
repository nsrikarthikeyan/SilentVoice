import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";

export default function HRDashboard() {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [generatedRoom, setGeneratedRoom] = useState("");
  const [copied, setCopied] = useState(false);

  const generateRoomId = () => {
    const id = Math.random().toString(36)
      .substring(2, 8).toUpperCase();
    setGeneratedRoom(id);
    setRoomId(id);
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(generatedRoom);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartInterview = () => {
    if (!roomId.trim()) return;
    navigate(`/interview/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-[#0D0D2B]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome, {userData?.name}! 👔
          </h1>
          <p className="text-gray-400">
            Create an interview room and share the ID 
            with your candidate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Create Interview Room */}
          <div className="bg-white/5 rounded-2xl p-6 
            border border-white/10">

            <h2 className="text-xl font-bold text-white mb-2">
              🚪 Create Interview Room
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Generate a Room ID and share it 
              with your candidate
            </p>

            {/* Generate Button */}
            <button
              onClick={generateRoomId}
              className="w-full bg-[#00D4AA]/20 text-[#00D4AA]
                border border-[#00D4AA]/30 font-bold py-3
                rounded-xl hover:bg-[#00D4AA]/30
                transition mb-4">
              🎲 Generate Room ID
            </button>

            {/* Generated Room ID */}
            {generatedRoom && (
              <div className="bg-white/10 rounded-xl p-4 
                mb-4 flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs mb-1">
                    Room ID
                  </p>
                  <p className="text-white font-bold 
                    text-2xl tracking-widest">
                    {generatedRoom}
                  </p>
                </div>
                <button
                  onClick={copyRoomId}
                  className="bg-[#4A90E2]/20 text-[#4A90E2]
                    px-4 py-2 rounded-xl text-sm
                    hover:bg-[#4A90E2]/30 transition">
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
              </div>
            )}

            {generatedRoom && (
              <p className="text-gray-400 text-xs mb-4 
                text-center">
                Share this ID with your candidate 
                via email or WhatsApp
              </p>
            )}

            {/* Start Button */}
            <button
              onClick={handleStartInterview}
              disabled={!roomId}
              className="w-full bg-gradient-to-r
                from-[#6C3FC5] to-[#4A90E2] text-white
                font-bold py-3 rounded-xl
                hover:opacity-90 transition
                disabled:opacity-50">
              Start Interview 🚀
            </button>
          </div>

          {/* How It Works */}
          <div className="bg-white/5 rounded-2xl p-6 
            border border-white/10">

            <h2 className="text-xl font-bold text-white mb-4">
              📋 How It Works
            </h2>

            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Generate Room ID",
                  desc: "Click generate to create a unique interview room"
                },
                {
                  step: "2",
                  title: "Share with Candidate",
                  desc: "Copy and send the Room ID to your candidate"
                },
                {
                  step: "3",
                  title: "Start Interview",
                  desc: "Click Start Interview to enter the room"
                },
                {
                  step: "4",
                  title: "AI Translates Signs",
                  desc: "Read and hear candidate's sign language answers"
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full
                    bg-[#6C3FC5] flex items-center
                    justify-center text-white text-sm
                    font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-white text-sm 
                      font-semibold">
                      {item.title}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="md:col-span-2 grid 
            grid-cols-3 gap-4">
            {[
              {
                icon: "🎯",
                label: "Interviews Conducted",
                value: "0"
              },
              {
                icon: "👥",
                label: "Candidates Interviewed",
                value: "0"
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