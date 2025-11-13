import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, X, Loader2 } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
  time: string;
}

// 🧠 Enhanced DCIP Knowledge Base
const DCIP_FAQ: Record<string, string> = {
  // --- General ---
  Hi:
  "Hello! I'm the DCIP AI Assistant. How can I help you today?",
  Hello:  
  "Hi! I'm the DCIP AI Assistant. How can I help you today?",
  dcip:
    "The District Collector Internship Program (DCIP) is a government-backed experiential learning program designed to expose students to the functioning of district administration under the guidance of the District CollectorInterns work on real administrative tasks, policy implementation, data analysis, and public service delivery projects..",
  location:
    "DCIP Malappuram civil station,malappuram,kerala.",
  program:
    "DCIP offers various programs like startup mentorship, innovation bootcamps, hackathons, workshops, and project incubation for aspiring entrepreneurs.",
  contact:
    "You can reach DCIP through the official website’s contact form or visit the Innova.",
  join:
    "Any student or innovator interested in innovation, entrepreneurship, or social impact can join DCIP by participating in events or applying for internships.",
  website:
    "Visit the official DCIP website: <a href='https://dcipmalappuram.vercel.app' target='_blank' class='underline text-blue-600'>dcipmalappuram.vercel.app</a>",

  // --- 💼 Internship Related ---
   "Hi ":
  "Hello! I'm the DCIP AI Assistant. How can I help you today?",
 " Hello ":
  "Hi! I'm the DCIP AI Assistant. How can I help you today?",
  "internship info":
    "The <b>District Collector Internship Program (DCIP)</b> provides students with real-world exposure to district-level governance, innovation, and administration. It's a flagship initiative by DCIP Malappuram.",
  "internship apply":
    "You can apply through the DCIP Malappuram website — check the Internship section or upcoming announcements. Usually, an online application form is provided.",
  "internship who":
    "Students from colleges in Malappuram district who are interested in innovation, administration, or technology can apply for the DCIP internship.",
  "internship eligibility":
    "Eligible candidates are students currently enrolled in Diploma, UG, or PG programs with an interest in innovation, governance, or social impact.",
  "internship duration":
    "The District Collector Internship Program typically lasts <b>4–6 weeks</b>, depending on the assigned project or department.",
  "internship certificate":
    "✅ Yes! All participants who successfully complete the internship receive an official <b>Certificate of Completion</b> from the District Collector’s office and DCIP Malappuram.",
  "internship paid":
    "No, the internship is <b>non-paid</b>, but it offers valuable experience, mentorship, and official recognition from the District Collector’s office.",
  "internship learn":
    "Interns gain practical knowledge in public project coordination, innovation proposal development, data analysis, and administration activities.",
  "internship updates":
    "Stay updated by visiting the DCIP website’s Internship or News & Events section, or follow official DCIP social media pages for announcements.",
  "internship contact":
    "For queries, contact the DCIP Coordination Team through the website’s Contact page or official email mentioned in internship notices.",
};

// 💡 Keyword groups for smart matching (handles grammar variations & synonyms)
const KEYWORD_GROUPS: Record<string, string[]> = {
  "internship info": ["what is internship", "about internship", "tell me internship", "internship details", "collector internship"],
  "internship apply": ["how to apply", "apply internship", "join internship", "registration", "apply for internship"],
  "internship who": ["who can apply", "eligible students", "who can join", "who allowed"],
  "internship eligibility": ["eligibility", "criteria", "requirements"],
  "internship duration": ["duration", "time period", "how long", "weeks"],
  "internship certificate": ["certificate", "completion", "proof", "do i get certificate"],
  "internship paid": ["paid", "stipend", "salary", "free internship"],
  "internship learn": ["what will i learn", "skills", "experience", "benefits"],
  "internship updates": ["updates", "latest news", "current internship", "ongoing internship"],
  "internship contact": ["contact", "email", "who to contact"],
  "dcip": ["what is dcip", "about dcip", "dcip full form"],
  "program": ["programs", "activities", "events", "initiatives"],
  "location": ["where is dcip", "location", "address"],
  "contact": ["reach", "email", "phone"],
  "join": ["join", "be part", "participate"],
  "website": ["official site", "portal", "link"],
  "hi": ["hi", "hello", "Hello", "hey", "greetings"],
};

// --- DCIP Context for AI fallback ---
const DCIP_CONTEXT = `
You are the official AI Assistant for DCIP Malappuram, Kerala.
Your role is to assist students, innovators, and mentors with information about DCIP programs, the District Collector Internship, and related activities.
If the user asks a question similar to an FAQ, use that answer directly.
Otherwise, generate a helpful and professional reply based on DCIP’s mission and programs.
`;

const DcipAiChatbotAdvanced: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("dcip-ai-smart");
    return saved
      ? JSON.parse(saved)
      : [
          {
            sender: "bot",
            text: "👋 Hey there! I'm the DCIP AI Assistant. Ask me about the District Collector Internship or DCIP programs!",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("dcip-ai-smart", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ✅ Smart Question Matching
  const findSmartMatch = (text: string): string | null => {
    const lower = text.toLowerCase();
    // Check for direct match
    const directKey = Object.keys(DCIP_FAQ).find((key) =>
      lower.includes(key)
    );
    if (directKey) return DCIP_FAQ[directKey];

    // Check by group keywords
    for (const [faqKey, keywords] of Object.entries(KEYWORD_GROUPS)) {
      if (keywords.some((k) => lower.includes(k))) {
        return DCIP_FAQ[faqKey];
      }
    }
    return null;
  };

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

    const smartAnswer = findSmartMatch(input);
    if (smartAnswer) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: smartAnswer,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        setLoading(false);
      }, 600);
      return;
    }

    try {
      const reply = await getAiReply([...messages, userMsg]);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Sorry, I couldn't connect to DCIP AI right now. Please try again later.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getAiReply = async (chatHistory: Message[]): Promise<string> => {
    const formatted = chatHistory.slice(-6).map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    }));

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: DCIP_CONTEXT },
          ...formatted,
        ],
        temperature: 0.8,
      }),
    });

    const data = await res.json();
    return (
      data.choices?.[0]?.message?.content?.trim() ||
      "I'm not sure about that — please check the DCIP website for updates!"
    );
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-4 rounded-full shadow-lg"
      >
        {open ? <X /> : <MessageCircle />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 right-6 w-80 md:w-96 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 flex justify-between items-center font-semibold">
              <span>🤖 DCIP Smart Assistant</span>
              <button onClick={() => setOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`mb-3 ${msg.sender === "user" ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`inline-block px-3 py-2 rounded-2xl text-sm shadow-sm ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                    }`}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                  <div className="text-xs mt-1 opacity-60">{msg.time}</div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex items-center text-sm text-gray-500 italic">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> DCIP Assistant is typing...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-3 border-t border-gray-200 flex items-center bg-gray-50 dark:bg-gray-900">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about DCIP or Internship..."
                className="flex-1 px-3 py-2 text-sm rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 outline-none"
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
