import { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "Who is eligible to apply for DCIP?",
    answer:
      "Any UG or PG graduates who are 20 years of age or above are eligible.",
  },
  {
    id: 2,
    question: "What is the duration of the internship program?",
    answer:
      "The duration is 3 months only.",
  },
  {
    id: 3,
    question: "Is the internship paid?",
    answer:
      "No, it is not a paid internship.",
  },
  {
    id: 6,
    question: "What is the application process?",
    answer:
      "Any UG or PG graduates aged 20 to 30 can apply. Applications open during the next batch intake through a Google Form. Shortlisted candidates will be called for an interview, and final selection will be made based on the interview.",
  },
  {
    id: 7,
    question: "Can I apply if I'm not from Malappuram?",
    answer:
      "No, the internship is only open to candidates from Malappuram.",
  },
  {
    id: 8,
    question: "What makes DCIP different from other internship programs?",
    answer:
      "DCIP is different from other internship programs because it offers real, on-ground public administration experience. Interns get direct exposure to district-level operations, government processes, community projects, and field activities. The program focuses on practical learning, leadership development, and hands-on involvement rather than classroom-based training. This combination of real-world experience and community service makes DCIP Malappuram unique.",
  },
];

export default function Faq() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 50}ms` : "0ms",
              }}
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === faq.id ? null : faq.id)
                }
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-primary/5 transition-colors duration-200 text-left"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={20}
                  className={`text-primary flex-shrink-0 transition-transform duration-300 ${
                    expandedId === faq.id ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  expandedId === faq.id ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 py-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-t border-primary/10">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Contact our team.
          </p>
          <button className="btn-glow">Contact Us</button>
        </div>
      </div>
    </section>
  );
}
