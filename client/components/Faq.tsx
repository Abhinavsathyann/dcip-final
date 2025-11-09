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
      "Students pursuing a degree in Computer Science, Information Technology, Electronics, or related fields from recognized institutions are eligible. Final year students are also welcome to apply. Basic programming knowledge is preferred but not mandatory.",
  },
  {
    id: 2,
    question: "What is the duration of the internship program?",
    answer:
      "The DCIP program is typically 3-6 months long. The exact duration may vary based on the batch and individual arrangements. We offer both part-time and full-time options.",
  },
  {
    id: 3,
    question: "Is the internship paid?",
    answer:
      "Yes, interns receive a monthly stipend throughout the program. The amount varies based on performance and the specific role. Additionally, top performers receive bonus incentives.",
  },
  {
    id: 4,
    question: "What technologies are covered in the program?",
    answer:
      "We cover a wide range of technologies including Web Development (React, Node.js), Mobile Development (Flutter, React Native), Data Science, Cloud Computing (AWS, Azure), AI/ML, and IoT. The curriculum is updated regularly to match industry trends.",
  },
  {
    id: 5,
    question: "Do you provide placement assistance?",
    answer:
      "Yes, we have a dedicated placement cell that works with interns throughout their program. We have partnerships with leading tech companies and conduct regular placement drives. Our placement success rate is above 90%.",
  },
  {
    id: 6,
    question: "What is the application process?",
    answer:
      "Applications are accepted through our online portal. You need to fill out the application form, submit your resume, and participate in a technical assessment and interview. Shortlisted candidates will be offered positions in the program.",
  },
  {
    id: 7,
    question: "Can I apply if I'm not from Malappuram?",
    answer:
      "Yes, we accept applications from candidates across Kerala and India. We have flexibility with remote options and accommodations for out-station interns.",
  },
  {
    id: 8,
    question: "What makes DCIP different from other internship programs?",
    answer:
      "DCIP offers industry mentorship, real-world projects, guaranteed stipend, strong placement support, and a community of like-minded professionals. Our curriculum is designed with input from leading tech companies and industry experts.",
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
