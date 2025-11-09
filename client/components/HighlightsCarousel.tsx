import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Highlight {
  id: number;
  title: string;
  description: string;
  color: string;
}

const highlights: Highlight[] = [
  {
    id: 1,
    title: "Batch 1 Celebration",
    description:
      "Successful completion of our inaugural batch with outstanding placements",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    title: "Industry Workshop",
    description:
      "Expert-led sessions on latest technologies and industry practices",
    color: "from-purple-400 to-purple-600",
  },
  {
    id: 3,
    title: "Hackathon Event",
    description:
      "Students showcasing innovative projects and winning recognition",
    color: "from-pink-400 to-pink-600",
  },
  {
    id: 4,
    title: "Internship Success",
    description:
      "Interns gaining real-world experience at leading tech companies",
    color: "from-green-400 to-green-600",
  },
  {
    id: 5,
    title: "Team Building",
    description:
      "Collaborative sessions strengthening bonds among interns and mentors",
    color: "from-orange-400 to-orange-600",
  },
];

export default function HighlightsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!autoPlay) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % highlights.length);
    }, 5000);

    return () => clearInterval(autoPlayRef.current);
  }, [autoPlay]);

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentIndex(
      (prev) => (prev - 1 + highlights.length) % highlights.length,
    );
  };

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % highlights.length);
  };

  const goToSlide = (index: number) => {
    setAutoPlay(false);
    setCurrentIndex(index);
  };

  return (
    <section
      id="highlights"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading mb-12">Highlights</h2>

        {/* Carousel */}
        <div className="relative group">
          {/* Main carousel */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            {highlights.map((highlight, index) => (
              <div
                key={highlight.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${highlight.color}`}
                ></div>

                {/* Content overlay */}
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-6 md:p-12 text-white">
                  <div className="text-center max-w-2xl animate-fade-in">
                    <h3 className="text-3xl md:text-5xl font-bold mb-4">
                      {highlight.title}
                    </h3>
                    <p className="text-lg md:text-xl opacity-90">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute -left-4 md:left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 hover:scale-110 active:scale-95"
            title="Previous"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-4 md:right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 hover:scale-110 active:scale-95"
            title="Next"
          >
            <ChevronRight size={24} className="text-foreground" />
          </button>

          {/* Dots Navigation */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2">
            {highlights.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                title={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="text-center mt-20 text-muted-foreground">
          <p>
            {currentIndex + 1} / {highlights.length}
          </p>
        </div>
      </div>
    </section>
  );
}
