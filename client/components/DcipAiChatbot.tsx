import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, X, Loader2 } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
  time: string;
}

// 🧠 Built-in DCIP Q&A Knowledge Base
const DCIP_FAQ: Record<string, string> = {
  "what is dcip":
    "DCIP (District Center for Innovation and Promotion) Malappuram is an initiative to nurture innovation, entrepreneurship, and technical creativity among students.",
  "where is dcip located":
    "DCIP Malappuram is based at Kuttukaran Polytechnic College, Malappuram, Kerala.",
  "what are dcip programs":
    "DCIP offers various programs like startup mentorship, innovation bootcamps, hackathons, workshops, and project incubation for aspiring entrepreneurs.",
  "how to contact dcip":
    "You can contact DCIP through the official website’s contact page or visit the Innovation Cell at Kuttukaran Polytechnic College.",
  "who can join dcip":
    "Any student or innovator with an idea or interest in technology, entrepreneurship, or innovation can join DCIP’s activities.",
  "what events are happening":
    "DCIP regularly conducts workshops, startup mentoring sessions, innovation challenges, and exhibitions. Check the Events page for current updates.",
  "dcip website":
    "Visit the official DCIP website: [https://dcipmalappuram.vercel.app](https://dcipmalappuram.vercel.app)",
  "about kuttukaran polytechnic college":
    "Kuttukaran Polytechnic College, located in Malappuram, is an AICTE-approved institution fostering technical education and innovation through initiatives like DCIP.",
  "thank you": "You're welcome! 😊 Feel free to ask anything else about DCIP.",
};

// 🌍 System Context for the AI model
const DCIP_CONTEXT = `
You are the official AI Assistant for DCIP Malappuram, Kerala.
Your purpose is to help students and innovators with details about DCIP programs, events, startup incubation, and contact info.
If the question matches built-in FAQ, use it. Otherwise, generate a professional, friendly response.
`;

const DcipAiChatbotAdvanced: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("dcip-ai-chat-v3");
    return saved
      ? JSON.parse(saved)
      : [
          {
            sender: "bot",
            text: "👋 Hey there! I’m the DCIP AI Assistant. Ask me about programs, events, or how to join!",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Save chat history
  useEffect(() => {
    localStorage.setItem("dcip-ai-chat-v3", JSON.stringify(messages));
  }, [messages]);

  // Scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Check for built-in FAQ
  const getBuiltInAnswer = (text: string): string | null => {
    const normalized = text.toLowerCase().trim();
    const key = Object.keys(DCIP_FAQ).find((q) =>
      normalized.includes(q)
    );
    return key ? DCIP_FAQ[key] : null;
  };

  // Handle send
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const builtIn = getBuiltInAnswer(input);
    if (builtIn) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: builtIn,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        setLoading(false);
      }, 600);
      return;
    }

    try {
      const reply = await getAiReply([...messages, userMsg]);
      const botMsg: Message = {
        sender: "bot",
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Sorry, I couldn't connect to DCIP's AI right now. Please try again later.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch AI Response
  const getAiReply = async (chatHistory: Message[]): Promise<string> => {
    const formattedMessages = chatHistory.slice(-6).map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.8,
        messages: [
          { role: "system", content: DCIP_CONTEXT },
          ...formattedMessages,
        ],
      }),
    });

    const data = await res.json();
    return (
      data.choices?.[0]?.message?.content?.trim() ||
      "I'm not sure about that, but you can explore more on the DCIP website!"
    );
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-4 rounded-full shadow-lg"
      >
        {open ? <X /> : <MessageCircle />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 right-6 w-80 md:w-96 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 flex justify-between items-center font-semibold">
              <span>🤖 DCIP AI Assistant</span>
              <button onClick={() => setOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`mb-3 ${
                    msg.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block px-3 py-2 rounded-2xl text-sm shadow-sm ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                    }`}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                  <div className="text-xs mt-1 opacity-60">
                    {msg.time}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center text-sm text-gray-500 dark:text-gray-400 italic"
                >
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> DCIP Assistant is typing...
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center bg-gray-50 dark:bg-gray-900">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask something about DCIP..."
                className="flex-1 px-3 py-2 text-sm rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 outline-none text-gray-800 dark:text-gray-100"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                disabled={loading}
                className="ml-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DcipAiChatbotAdvanced;
