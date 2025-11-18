import { useState } from "react";

export default function ContactModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!name) return "Please enter your name.";
    if (!email) return "Please enter your email.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format.";
    if (!message) return "Message cannot be empty.";
    return null;
  };

  const sendEmail = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setSuccess("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 relative">
        <button
          className="absolute top-3 right-3 text-gray-500"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>

        <div className="space-y-4">
          <input
            className="w-full p-3 border rounded"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full p-3 border rounded"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            className="w-full p-3 border rounded"
            rows={4}
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        {error && <p className="text-red-600 mt-3">{error}</p>}
        {success && <p className="text-green-600 mt-3">{success}</p>}

        <button
          onClick={sendEmail}
          className="btn-glow w-full mt-6"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>
    </div>
  );
}
