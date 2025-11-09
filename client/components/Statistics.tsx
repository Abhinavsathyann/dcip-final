import { useEffect, useRef, useState } from "react";

interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

const stats: Stat[] = [
  { label: "Interns Trained", value: 500, suffix: "+", icon: "👥" },
  { label: "Placements", value: 450, suffix: "+", icon: "💼" },
  { label: "Batches Completed", value: 6, suffix: "", icon: "🎓" },
  { label: "Success Rate", value: 95, suffix: "%", icon: "🎯" },
];

interface CounterProps {
  stat: Stat;
  isVisible: boolean;
}

function Counter({ stat, isVisible }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let current = 0;
    const increment = stat.value / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isVisible, stat.value]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
        {count}
        {stat.suffix}
      </div>
      <p className="text-muted-foreground text-sm md:text-base">{stat.label}</p>
    </div>
  );
}

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="statistics"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900 via-primary/10 to-secondary/10 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            By The Numbers
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Our impact in numbers - transforming careers and shaping futures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl p-8 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300"></div>

              {/* Border */}
              <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-white/40 transition-all duration-300"></div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="text-5xl mb-4">{stat.icon}</div>
                <Counter stat={stat} isVisible={isVisible} />
              </div>

              {/* Hover shadow */}
              <div className="absolute inset-0 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
