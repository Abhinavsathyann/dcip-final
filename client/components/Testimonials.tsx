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
      "Being a DCIP intern was a transformational experience. It gave me real exposure to leadership, decision-making, and public service. Working with the District Collector and officials showed me how vision and commitment create real impact.",
    rating: 5,
  },
  {
    id: 2,
    name: "MUHAMMED NISAR K",
    batch: "Batch 5",
    message:
      "Being part of the District Collector's Internship Programme gave me real exposure to how administration and society work together. It strengthened my communication and leadership skills.",
    rating: 5,
  },
  {
    id: 3,
    name: "SHIYAS AHAMMED",
    batch: "Batch 5",
    message:
      "This internship helped me understand government systems, digital initiatives, and decision-making. It strengthened my teamwork and inspired me to use technology for positive change.",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Fade-in on scroll
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

  // Autoplay
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

  const activeTestimonial = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl -z-10"></div>

      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <h2 className="section-heading mb-3 text-center">Success Stories</h2>
        <p className="section-subheading mb-16 text-center">
          Hear from our interns and their transformation journeys
        </p>

        {/* SINGLE CARD CONTAINER */}
        <div className="w-full flex justify-center mb-12">
          <div className="w-full max-w-3xl">
            <div
              className={`glass-effect p-8 rounded-xl border border-white/40 shadow-lg transition-all duration-700 
                ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: activeTestimonial.rating }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  )
                )}
              </div>

              {/* Message */}
              <p className="text-foreground mb-6 leading-relaxed italic text-lg">
                "{activeTestimonial.message}"
              </p>

              {/* Name + Batch */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {activeTestimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-lg">
                    {activeTestimonial.name}
                  </h4>
                  <p className="text-xs text-primary font-medium">
                    {activeTestimonial.batch}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between gap-6 mt-10 flex-wrap">
          {/* Prev & Next Buttons */}
          <div className="flex gap-4 order-2 sm:order-1">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white border-2 border-primary text-primary hover:bg-primary/10 transition-all hover:scale-110 active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all hover:scale-110 active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
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
              ></button>
            ))}
          </div>
3
          {/* Slide Number */}
          <div className="text-sm text-muted-foreground order-3 w-full sm:w-auto text-center sm:text-right">
            {currentIndex + 1} / {testimonials.length}
          </div>
        </div>
      </div>
    </section>
  );
}
