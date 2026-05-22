import React, { useState } from "react";

export default function HRTextInput({ onSendMessage }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
    onSendMessage(message);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="bg-white/5 rounded-2xl p-6
      border border-white/10">

      <h3 className="text-xl font-bold mb-2 text-white">
        💬 Send Message to Candidate
      </h3>
      <p className="text-gray-400 text-sm mb-4">
        Candidate will see your message on their screen
      </p>

      {/* Message History */}
      <div className="bg-black/20 rounded-xl p-4
        mb-4 h-40 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm 
            text-center mt-8">
            No messages yet...
          </p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="mb-3">
              <div className="bg-[#4A90E2]/20 rounded-xl
                p-3 inline-block max-w-full">
                <p className="text-white text-sm">
                  {msg.text}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  HR • {msg.time}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your question here..."
          className="flex-1 bg-white/10 text-white
            placeholder-gray-500 rounded-xl px-4 py-3
            border border-white/10
            focus:border-[#4A90E2] focus:outline-none
            text-sm"
        />
        <button
          onClick={handleSend}
          className="bg-gradient-to-r from-[#6C3FC5]
            to-[#4A90E2] text-white px-6 py-3
            rounded-xl font-bold hover:opacity-90
            transition">
          Send →
        </button>
      </div>
    </div>
  );
}