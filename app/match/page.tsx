"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MatchPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSend = () => {
    if (!message.trim()) return;
    // Bisa simpan pesan ke state/global store atau server di sini
    router.push("/bumble-chat");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full flex flex-col items-center gap-4">
        {/* Stacked photos */}
        <div className="relative w-40 h-40">
          <img
            src="/img/profile1.jpg"
            alt="Profile 1"
            className="absolute w-32 h-32 object-cover rounded-xl -rotate-6 top-0 left-0 shadow-lg"
          />
          <img
            src="/img/profile2.jpg"
            alt="Profile 2"
            className="absolute w-32 h-32 object-cover rounded-xl rotate-6 top-0 left-8 shadow-lg"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mt-36">What a match!</h1>
        <p className="text-gray-600 text-center text-sm">
          Now, you both have 24 hours to start chatting.
        </p>

        {/* Chat preview */}
        <div className="bg-[#fff500] p-3 rounded-lg w-full flex flex-col gap-2">
          <p className="text-black text-sm">
            <strong>Message Jamal first</strong>, or see if they reply to your Opening Move
          </p>
          <p className="text-black text-sm"><strong>Your Opening Move</strong></p>
          <p className="text-black text-sm">What do you like about my profile?</p>
        </div>

        {/* Input + Send Button */}
        <div className="flex w-full gap-2 mt-3">
          <input
            type="text"
            placeholder="Send a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button
            onClick={handleSend}
            className="bg-yellow-500 text-white rounded-full px-4 py-2 font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
