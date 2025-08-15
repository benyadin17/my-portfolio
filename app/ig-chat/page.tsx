"use client";

import { useState, useRef, useEffect } from "react";
import { FiCamera, FiVideo, FiMic } from "react-icons/fi";
import { AiOutlineGif, AiOutlinePlus } from "react-icons/ai";

interface Message {
  id: number;
  text: string;
  sender: "me" | "them";
  show?: boolean; // untuk animasi
}

export default function IGChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey! How's it going?", sender: "them", show: true },
    { id: 2, text: "Hi! Good, you?", sender: "me", show: true },
    { id: 3, text: "Pretty good! Have you hiked recently?", sender: "them", show: true },
    { id: 4, text: "Yes! Last weekend was amazing!", sender: "me", show: true },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const backgrounds = [
    "/assets/aurora.jpg",
    "/assets/clouds.jpg",
  ];

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg: Message = { id: Date.now(), text: newMessage, sender: "me", show: false };
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Ganti background tiap 1 menit
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Trigger animasi fade-in slide-up
  useEffect(() => {
    messages.forEach((msg, index) => {
      if (!msg.show) {
        setTimeout(() => {
          setMessages((prev) =>
            prev.map((m) => (m.id === msg.id ? { ...m, show: true } : m))
          );
        }, index * 100); // stagger animasi 100ms per bubble
      }
    });
  }, [messages]);

  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gray-100">
      <div className="relative w-full max-w-md flex flex-col h-[90vh] rounded-2xl shadow-md overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}
        />

        {/* Chat container */}
        <div className="relative z-10 flex flex-col h-full overflow-hidden">

          {/* Header */}
          <div className="p-3 flex items-center justify-between bg-black/20 backdrop-blur-sm border-b border-white/20">
            <div className="flex items-center gap-3">
              <img
                src="/assets/profile.jpg"
                alt="profile"
                className="w-10 h-10 rounded-full border border-white/30"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-white text-sm">Alex Johnson</span>
                <span className="text-white/70 text-xs">Active now</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white">
              <FiVideo size={20} className="hover:opacity-80" />
              <FiMic size={20} className="hover:opacity-80" />
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} transition-all duration-300 ${
                  msg.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                    msg.sender === "me"
                      ? "bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-br-none"
                      : "bg-gray-800/70 text-white rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-3 flex items-center gap-2 bg-black/20 backdrop-blur-sm border-t border-white/20">
            {/* Input + Camera gabung */}
            <div className="flex items-center flex-1 min-w-0 bg-white/20 rounded-full px-3 py-2 gap-2">
              <FiCamera size={20} className="text-white" />
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Message..."
                className="flex-1 min-w-0 bg-transparent text-white placeholder-white/70 focus:outline-none"
                onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
              />
            </div>

            {/* Tombol kanan tetap flex-none */}
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white">
                <AiOutlineGif size={20} />
              </button>
              <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white">
                <AiOutlinePlus size={20} />
              </button>
              <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white">
                <FiMic size={20} />
              </button>
              <button
                onClick={sendMessage}
                className={`bg-blue-500 text-white rounded-full px-4 py-2 font-semibold ${
                  !newMessage.trim() ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
                }`}
              >
                Send
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
