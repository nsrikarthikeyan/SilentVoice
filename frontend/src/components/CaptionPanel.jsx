import React, { useEffect, useRef } from "react";

export default function CaptionPanel({
  translations,
  hrMessages,
  userType
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [translations, hrMessages]);

  return (
    <div className="bg-white/5 rounded-2xl p-6
      border border-white/10 h-full">

      <h3 className="text-xl font-bold mb-4 text-white">
        {userType === "hr"
          ? "🤟 Candidate's Answers"
          : "💬 HR's Questions"}
      </h3>

      <div className="h-64 overflow-y-auto space-y-3">

        {/* HR Messages shown to Candidate */}
        {userType === "candidate" &&
          hrMessages?.map((msg, i) => (
            <div key={i} className="bg-[#4A90E2]/20
              rounded-xl p-4 border border-[#4A90E2]/30">
              <p className="text-xs text-[#4A90E2]
                font-bold mb-1">
                👔 HR Question
              </p>
              <p className="text-white text-sm">{msg}</p>
            </div>
          ))}

        {/* Sign Translations shown to HR */}
        {userType === "hr" &&
          translations?.map((text, i) => (
            <div key={i} className="bg-[#6C3FC5]/20
              rounded-xl p-4 border border-[#6C3FC5]/30">
              <p className="text-xs text-[#6C3FC5]
                font-bold mb-1">
                🤟 Candidate Answer
              </p>
              <p className="text-white text-sm">{text}</p>
            </div>
          ))}

        {/* Empty State */}
        {(!translations || translations?.length === 0) &&
         (!hrMessages || hrMessages?.length === 0) && (
          <div className="text-center mt-8">
            <p className="text-4xl mb-2">🤟</p>
            <p className="text-gray-500 text-sm">
              {userType === "hr"
                ? "Waiting for candidate to start signing..."
                : "Waiting for HR to send a question..."}
            </p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}