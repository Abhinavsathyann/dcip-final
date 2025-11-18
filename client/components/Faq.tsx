// Updated FAQ component with Contact Us modal (Name, Email, Message) and email sending placeholder
import { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  { id: 1, question: "Who is eligible to apply for DCIP?", answer: "Any UG or PG graduates who are 20 years of age or above are eligible." },
  { id: 2, question: "What is the duration of the internship program?", answer: "The duration is 3 months only." },
  { id: 3, question: "Is the internship paid?", answer: "No, it is not a paid internship." },
  { id: 6, question: "What is the application process?", answer: "Any UG or PG graduates aged 20 to 30 can apply. Applications open during the next batch intake through a Google Form. Shortlisted candidates will be called for an interview, and final selection will be made based on the interview." },
  { id: 7, question: "Can I apply if I'm not from Malappuram?", answer: "No, the internship is only open to candidates from Malappuram." },
  { id: 8, question: "What makes DCIP different from other internship programs?", answer: "DCIP offers real, on-ground administrative experience, practical learning, leadership development, and community fieldwork exposure, making it unique." }
];

export default function Faq() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Contact form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const sendEmail = async () => {
    setLoading(true);

    // Simulated email sending - replace with API or email service
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="section-heading mb-12">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`glass-effect rounded-lg overflow-hidden transition-all duration-500 hover:shadow-lg border border-white/40 hover:border-primary/30 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 50}ms` : "0ms" }}
            >
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-primary/5 transition-colors duration-200 text-left"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
                <ChevronDown
                  size={20}
                  className={`text-primary transition-transform duration-300 ${expandedId === faq.id ? "rotate-180" : ""}`}
                />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-out ${expandedId === faq.id ? "max-h-96" : "max-h-0"}`}>
                <div className="px-6 py-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-t border-primary/10">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">Can't find the answer you're looking for? Contact our team.</p>
          <button onClick={() => setShowModal(true)} className="btn-glow">Contact Us</button>
        </div>
      </div>

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 relative">
            <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={() => setShowModal(false)}>✕</button>

            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-600 mb-6">Send us a message and our team will get back to you.</p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-primary outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-primary outline-none"
              />

              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full p-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-primary outline-none"
              ></textarea>
            </div>

            {success && <p className="text-green-600 text-sm mt-2">Message sent successfully!</p>}

            <button
              onClick={sendEmail}
              disabled={loading}
              className="btn-glow w-full mt-6 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}