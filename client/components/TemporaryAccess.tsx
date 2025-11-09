import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, KeyRound } from "lucide-react";

export default function TemporaryAccess() {
  const [accessCode, setAccessCode] = useState("");

  const handleAccess = () => {
    if (accessCode.trim().toLowerCase() === "dcip2025") {
      localStorage.setItem("dcip-access-key", "dcip2025");
      window.location.reload(); // ✅ reloads to show main site
    } else {
      alert("❌ Invalid access key. Please contact admin.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden text-center p-6">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl -z-10"
        animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="mb-8"
      >
        <img
          src="Assets/images/dciplogo.png"
          alt="DCIP Logo"
          className="w-28 h-28 rounded-2xl object-contain shadow-2xl border border-gray-200"
        />
      </motion.div>

      {/* Lock Icon */}
      <motion.div
        initial={{ rotate: -10, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="bg-gradient-to-br from-primary to-secondary p-4 rounded-2xl shadow-xl mb-6"
      >
        <Lock className="text-white w-10 h-10" />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4"
      >
        Access Temporarily Restricted
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-gray-600 max-w-lg leading-relaxed mb-10"
      >
        The DCIP Malappuram website is currently under review.  
        Access is limited to authorized users. Enter your access key below.
      </motion.p>

      {/* Access Code Input */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="flex items-center gap-3 bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3 w-full max-w-xs mx-auto"
      >
        <KeyRound className="text-primary" />
        <input
          type="password"
          placeholder="Enter Access Key"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
          className="flex-1 bg-transparent focus:outline-none text-sm text-gray-700"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAccess}
          className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition"
        >
          Unlock
        </motion.button>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 text-gray-400 text-sm"
      >
        <p className="animate-pulse">
          © {new Date().getFullYear()} DCIP Malappuram — All Rights Reserved
        </p>
      </motion.div>
    </div>
  );
}
