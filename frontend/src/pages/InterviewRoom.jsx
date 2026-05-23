import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import CaptionPanel from "../components/CaptionPanel";
import HRTextInput from "../components/HRTextInput";
import HandDetector from "../components/HandDetector";

export default function InterviewRoom() {
  const { roomId } = useParams();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [translations, setTranslations] = useState([]);
  const [hrMessages, setHrMessages] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Interview timer
  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleEndInterview = () => {
    if (window.confirm(
      "Are you sure you want to end the interview?"
    )) {
      navigate(
        userData?.role === "candidate" ? "/candidate" : "/hr"
      );
    }
  };

  const handleHRMessage = (message) => {
    setHrMessages([...hrMessages, message]);
  };

  return (
    <div className="min-h-screen bg-[#0D0D2B] 
      flex flex-col">

      {/* Top Bar */}
      <div className="bg-white/5 border-b 
        border-white/10 px-6 py-3 flex items-center 
        justify-between">

        <div className="flex items-center gap-4">
          <span className="text-white font-bold text-lg">
            🤟 SilentVoice
          </span>
          <div className="bg-[#00D4AA]/20 text-[#00D4AA] 
            px-3 py-1 rounded-full text-xs font-bold 
            border border-[#00D4AA]/30">
            Room: {roomId}
          </div>
          <div className="bg-red-500/20 text-red-400 
            px-3 py-1 rounded-full text-xs font-bold 
            border border-red-500/30 flex items-center gap-1">
            <div className="w-2 h-2 rounded-full 
              bg-red-400 animate-pulse" />
            LIVE
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Timer */}
          <div className="text-white font-mono text-lg">
            ⏱️ {formatTime(timer)}
          </div>

          {/* Start/Pause Timer */}
          <button
            onClick={() => setIsActive(!isActive)}
            className="bg-[#4A90E2]/20 text-[#4A90E2]
              px-4 py-2 rounded-xl text-sm
              hover:bg-[#4A90E2]/30 transition">
            {isActive ? "⏸ Pause" : "▶ Start"}
          </button>

          {/* End Interview */}
          <button
            onClick={handleEndInterview}
            className="bg-red-500/20 text-red-400
              border border-red-500/30 px-4 py-2
              rounded-xl text-sm hover:bg-red-500/30
              transition">
            End Interview
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-3 gap-4 p-6">

        {/* Video Area - Left */}
        <div className="col-span-2 space-y-4">

          {/* Camera Feed */}
{userData?.role === "candidate" ? (
  <HandDetector
    onLandmarksDetected={(landmarks) => {
      console.log("Landmarks:", landmarks);
    }}
  />
) : (
  <div className="bg-white/5 rounded-2xl
    border border-white/10 overflow-hidden
    aspect-video flex items-center justify-center">
    <div className="text-center">
      <div className="text-6xl mb-4">👔</div>
      <p className="text-white font-semibold">
        Waiting for Candidate
      </p>
      <p className="text-gray-400 text-sm mt-1">
        Candidate's translation will appear
        in the caption panel
      </p>
    </div>
  </div>
)}

          {/* HR Text Input */}
          {userData?.role === "hr" && (
            <HRTextInput onSendMessage={handleHRMessage} />
          )}
        </div>

        {/* Right Panel */}
        <div className="space-y-4">

          {/* User Info */}
          <div className="bg-white/5 rounded-2xl p-4 
            border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full 
                bg-[#6C3FC5] flex items-center 
                justify-center text-xl">
                {userData?.role === "candidate" ? "🤟" : "👔"}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  {userData?.name}
                </p>
                <p className="text-gray-400 text-xs capitalize">
                  {userData?.role}
                </p>
              </div>
              <div className="ml-auto w-3 h-3 rounded-full 
                bg-[#00D4AA] animate-pulse" />
            </div>
          </div>

          {/* Caption Panel */}
          <CaptionPanel
            translations={translations}
            hrMessages={hrMessages}
            userType={userData?.role}
          />

          {/* Candidate Instructions */}
          {userData?.role === "candidate" && (
            <div className="bg-[#6C3FC5]/10 rounded-2xl 
              p-4 border border-[#6C3FC5]/30">
              <p className="text-[#6C3FC5] font-bold 
                text-sm mb-2">
                🤟 Signing Tips
              </p>
              <ul className="space-y-1">
                {[
                  "Keep hands in camera view",
                  "Sign clearly and slowly",
                  "Pause 3 sec between answers",
                  "Good lighting = better accuracy",
                ].map((tip, i) => (
                  <li key={i} className="text-gray-400 
                    text-xs flex gap-2">
                    <span>•</span>{tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}