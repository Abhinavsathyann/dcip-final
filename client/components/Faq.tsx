import { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ContactModal from "./ContactModal"; // IMPORT MODAL

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "Who is eligible to apply for DCIP?",
    answer: "Any UG or PG graduates who are 20 years of age or above are eligible.",
  },
  {
    id: 2,
    question: "What is the duration of the internship program?",
    answer: "The duration is 3 months only.",
  },
  {
    id: 3,
    question: "Is the internship paid?",
    answer: "No, it is not a paid internship.",
  },
  {
    id: 6,
    question: "What is the application process?",
    answer:
      "Any UG or PG graduates aged 20 to 30 can apply. Shortlisted candidates will be called for an interview.",
  },
  {
    id: 7,
    question: "Can I apply if I'm not from Malappuram?",
    answer: "No, the internship is only open to candidates from Malappuram.",
  },
  {
    id: 8,
    question: "What makes DCIP different?",
    answer:
      "DCIP offers real administrative exposure, leadership development, and community-based field experience.",
  },
];

export default function Faq() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="section-heading mb-12">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="glass-effect rounded-lg overflow-hidden border border-primary/10"
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === faq.id ? null : faq.id)
                }
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <ChevronDown
                  size={20}
                  className={`transition-transform ${
                    expandedId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedId === faq.id ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 py-4 bg-primary/5 border-t border-primary/10">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Contact our team.
          </p>
          <button onClick={() => setShowModal(true)} className="btn-glow">
            Contact Us
          </button>
        </div>
      </div>

      {/* CONTACT MODAL */}
      {showModal && <ContactModal onClose={() => setShowModal(false)} />}
    </section>
  );
}
