import { useRef, useEffect, useState } from "react";
import { Newspaper, Users, Zap, Target } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "DCIP Expands to Five Batches",
    description:
      "Due to overwhelming response and success, DCIP has expanded to accommodate five consecutive batches of talented interns.",
    date: "2024-01-20",
    category: "Expansion",
  },
  {
    id: 2,
    title: "Industry Partnership Announced",
    description:
      "We've partnered with leading tech companies to provide internship opportunities and real-world project experience.",
    date: "2024-01-18",
    category: "Partnership",
  },
  {
    id: 3,
    title: "Batch 4 Graduation Ceremony",
    description:
      "Successful completion and graduation of Batch 4 with 95% placement rate in top-tier companies.",
    date: "2024-01-15",
    category: "Achievement",
  },
];

const structureItems = [
  {
    icon: Zap,
    title: "Selection Process",
    description:
      "Online assessment, technical interview, and HR interview to ensure best fit for the program.",
  },
  {
    icon: Users,
    title: "Training Phase",
    description:
      "Intensive 2-week foundational training covering technologies, tools, and industry best practices.",
  },
  {
    icon: Target,
    title: "Project Work",
    description:
      "Real-world projects assigned based on skills and interests, with mentorship from industry experts.",
  },
  {
    icon: Newspaper,
    title: "Placement Drive",
    description:
      "Dedicated placement assistance with mock interviews, resume reviews, and company partnerships.",
  },
];

export default function News() {
  const sectionRef = useRef<HTMLSection>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      id="news"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* News Section */}
        <div className="mb-20">
          <h2 className="section-heading mb-12">DCIP News</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item, index) => (
              <div
                key={item.id}
                className={`glass-effect p-6 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-white/40 hover:border-primary/30 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-3">
                  {item.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4">
                  {item.description}
                </p>

                <button className="text-primary font-semibold text-sm hover:gap-2 inline-flex items-center gap-1 transition-all">
                  Read More
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Structure Section */}
        <div>
          <h2 className="section-heading mb-12">DCIP Structure</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {structureItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`relative group rounded-xl p-6 bg-gradient-to-br from-white to-gray-50 border border-border hover:shadow-lg transition-all duration-300 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                  }}
                >
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300">
                    <Icon size={24} className="text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Step indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {index + 1}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timeline description */}
          <div className="mt-12 p-8 glass-effect rounded-xl">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Program Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  2 Weeks
                </div>
                <p className="text-sm text-muted-foreground">
                  Foundation Training
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">
                  2-3 Months
                </div>
                <p className="text-sm text-muted-foreground">Project Work</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">
                  1 Month
                </div>
                <p className="text-sm text-muted-foreground">Mentorship</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  Ongoing
                </div>
                <p className="text-sm text-muted-foreground">
                  Placement Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
