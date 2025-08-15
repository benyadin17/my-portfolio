"use client";

import { useState, useRef, useEffect } from "react";
import { FiCamera, FiVideo, FiMic } from "react-icons/fi";
import { AiOutlineGif, AiOutlineQuestionCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface Message {
  id: number;
  text: string;
  sender: "me" | "them";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey! How's it going?", sender: "them" },
    { id: 2, text: "Hi! Good, you?", sender: "me" },
    { id: 3, text: "Pretty good! Have you hiked recently?", sender: "them" },
    { id: 4, text: "Yes! Last weekend was amazing!", sender: "me" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), text: newMessage, sender: "me" }]);
    setNewMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-2">
      <div className="bg-white rounded-xl shadow-md w-full max-w-sm flex flex-col h-[80vh]">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 font-semibold text-lg">
          Alex Johnson
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                  msg.sender === "me"
                    ? "bg-yellow-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Button Move To IG */}
          <div className="flex justify-center mt-4">
            <button
              className="bg-pink-500 text-white px-6 py-2 rounded-full font-semibold"
              onClick={() => router.push("/ig-chat")} // pindah ke halaman IG chat
            >
              Move To IG
            </button>
          </div>

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-3 border-t border-gray-200 flex items-center gap-2">
          {/* Left buttons */}
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-gray-200"><FiCamera size={20} /></button>
            <button className="p-2 rounded-full hover:bg-gray-200"><AiOutlineQuestionCircle size={20} /></button>
            <button className="p-2 rounded-full hover:bg-gray-200"><FiVideo size={20} /></button>
          </div>

          {/* Input + GIF inside */}
          <div className="relative flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full border border-gray-300 rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
            />
            {/* GIF button inside input */}
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => alert("GIF clicked")}
            >
              <AiOutlineGif size={20} />
            </button>
          </div>

          {/* Right buttons */}
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-gray-200"><FiMic size={20} /></button>
          </div>

          {/* Send button */}
          <button
            onClick={sendMessage}
            className="bg-yellow-500 text-white rounded-full px-4 py-2 font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
