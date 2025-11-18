// Updated Testimonials component with company and role removed
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  batch: string;
  message: string;
  rating: number;
  photo?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "ANUSHA K P",
    batch: "Batch 5",
    message:
      "Being a DCIP intern was a transformational experience. It gave me real exposure to leadership, decision-making, and public service. Working with the District Collector and officials showed me how vision and commitment create real impact. This internship has inspired me to stay connected with public service and aim for meaningful change",
    rating: 5,
  },
  {
    id: 2,
    name: "MUHAMMED NISAR K",
    batch: "Batch 5",
    message:
      "Being part of the District Collector's Internship Programme gave me real exposure to how administration and society work together. It strengthened my communication, reporting, teamwork, and leadership skills while deepening my understanding of governance and public service.",
    rating: 5,
  },
  {
    id: 3,
    name: "SHIYAS AHAMMED",
    batch: "Batch 5",
    message:
      "Being part of the District Collector’s Internship Programme was a valuable experience. It helped me understand government systems, data-driven decision-making, and digital initiatives. The internship strengthened my teamwork, social responsibility, and inspired me to use technology for positive change.",
    rating: 5,
  },
  // {
  //   id: 4,
  //   name: "Deepa M",
  //   batch: "Batch 3",
  //   message:
  //     "DCIP is not just training; it's a transformation. The exposure and discipline I gained are invaluable.",
  //   rating: 5,
  // },
  // {
  //   id: 5,
  //   name: "Vikram S",
  //   batch: "Batch 2",
  //   message:
  //     "Wonderful program! The guidance and field activities helped me develop leadership and teamwork skills.",
  //   rating: 5,
  // },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout>();

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoPlay || !isVisible) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(autoPlayRef.current);
  }, [autoPlay, isVisible]);

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setAutoPlay(false);
    setCurrentIndex(index);
  };

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="section-heading mb-3">Success Stories</h2>
          <p className="section-subheading mb-16">
            Hear from our interns and their transformation journeys
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`glass-effect p-6 rounded-xl border border-white/40 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:scale-105 transform ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-foreground mb-6 leading-relaxed italic">
                  "{testimonial.message}"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-primary font-medium">
                      {testimonial.batch}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div className="flex gap-4 order-2 sm:order-1">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white border-2 border-primary text-primary hover:bg-primary/10 transition-all hover:scale-110 active:scale-95"
                title="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all hover:scale-110 active:scale-95"
                title="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex gap-2 order-1 sm:order-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  title={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>

            <div className="text-sm text-muted-foreground order-3 sm:order-3 w-full sm:w-auto text-center sm:text-right">
              {currentIndex + 1} / {testimonials.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}