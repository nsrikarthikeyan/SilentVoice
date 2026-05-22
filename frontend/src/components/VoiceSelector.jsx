import React, { useState } from "react";

const voices = [
  {
    id: 1,
    name: "Deep Male",
    icon: "👨",
    lang: "en-US",
    pitch: 0.8,
    rate: 0.9
  },
  {
    id: 2,
    name: "Soft Female",
    icon: "👩",
    lang: "en-US",
    pitch: 1.4,
    rate: 1.0
  },
  {
    id: 3,
    name: "Neutral",
    icon: "🧑",
    lang: "en-US",
    pitch: 1.0,
    rate: 1.0
  },
  {
    id: 4,
    name: "Hindi Accent",
    icon: "🇮🇳",
    lang: "hi-IN",
    pitch: 1.0,
    rate: 0.9
  },
  {
    id: 5,
    name: "Tamil Accent",
    icon: "🌟",
    lang: "ta-IN",
    pitch: 1.0,
    rate: 0.9
  },
];

export default function VoiceSelector({ onVoiceSelect }) {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [testing, setTesting] = useState(false);

  const handleSelect = (voice) => {
    setSelectedVoice(voice);
    onVoiceSelect(voice);
  };

  const testVoice = (voice) => {
    setTesting(true);
    const utterance = new SpeechSynthesisUtterance(
      "Hello, I am a SilentVoice candidate. This is my selected voice."
    );
    utterance.pitch = voice.pitch;
    utterance.rate = voice.rate;
    utterance.lang = voice.lang;
    utterance.onend = () => setTesting(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white/5 rounded-2xl p-6
      border border-white/10">

      <h3 className="text-xl font-bold mb-2 text-white">
        🎙️ Choose Your Voice
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        HR will hear your answers in this voice
      </p>

      <div className="grid grid-cols-1 gap-3">
        {voices.map((voice) => (
          <div
            key={voice.id}
            onClick={() => handleSelect(voice)}
            className={`flex items-center justify-between
              p-4 rounded-xl cursor-pointer border
              transition-all ${
              selectedVoice?.id === voice.id
                ? "border-[#6C3FC5] bg-[#6C3FC5]/20"
                : "border-white/10 hover:border-[#4A90E2]"
            }`}>

            <div className="flex items-center gap-3">
              <span className="text-2xl">{voice.icon}</span>
              <div>
                <p className="font-semibold text-white text-sm">
                  {voice.name}
                </p>
                <p className="text-gray-400 text-xs">
                  {voice.lang}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {selectedVoice?.id === voice.id && (
                <span className="text-[#00D4AA] text-xs
                  font-bold">
                  ✅ Selected
                </span>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  testVoice(voice);
                }}
                className="bg-[#4A90E2]/20 text-[#4A90E2]
                  text-xs px-3 py-1 rounded-full
                  hover:bg-[#4A90E2]/40 transition">
                {testing ? "Playing..." : "▶ Test"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedVoice && (
        <div className="mt-4 p-3 bg-[#00D4AA]/10
          rounded-xl border border-[#00D4AA]/30">
          <p className="text-[#00D4AA] text-sm text-center">
            ✅ Voice set to <strong>
              {selectedVoice.name}
            </strong> — HR will hear you in this voice!
          </p>
        </div>
      )}
    </div>
  );
}