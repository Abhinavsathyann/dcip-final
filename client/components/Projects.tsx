import { ExternalLink } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Full-stack web application with payment integration and inventory management system.",
    category: "Web Development",
    color: "from-blue-400 to-cyan-400",
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description:
      "Cross-platform mobile application for secure financial transactions and account management.",
    category: "Mobile Development",
    color: "from-purple-400 to-pink-400",
  },
  {
    id: 3,
    title: "AI Chatbot System",
    description:
      "Intelligent chatbot powered by machine learning for customer support automation.",
    category: "AI/ML",
    color: "from-green-400 to-emerald-400",
  },
  {
    id: 4,
    title: "Data Analytics Dashboard",
    description:
      "Real-time analytics dashboard with interactive visualizations and business insights.",
    category: "Data Science",
    color: "from-orange-400 to-red-400",
  },
  {
    id: 5,
    title: "Cloud Management Tool",
    description:
      "Cloud infrastructure monitoring and management platform with automated scaling.",
    category: "Cloud Computing",
    color: "from-indigo-400 to-purple-400",
  },
  {
    id: 6,
    title: "IoT Smart Home System",
    description:
      "Connected smart home devices with centralized control and automation features.",
    category: "IoT",
    color: "from-yellow-400 to-orange-400",
  },
];

export default function Projects() {
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
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="section-heading mb-12">Our Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer h-80 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                <div>
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-4 backdrop-blur-sm">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold mb-3 group-hover:translate-y-0 transition-transform">
                    {project.title}
                  </h3>
                </div>

                <div>
                  <p className="text-sm opacity-90 mb-4 group-hover:opacity-100 transition-opacity">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-2 pt-4 border-t border-white/20">
                    <button className="inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all">
                      Read More
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
