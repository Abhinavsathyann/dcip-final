import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  details: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack application with payment & inventory system.",
    category: "Web Development",
    image: "Assets/images/Afrah.jpg",
    details:
      "This platform includes secure checkout, admin control, product analytics, stock handling, and cloud deployment.",
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description: "Secure digital banking with biometric login & UPI.",
    category: "Mobile Development",
    image: "/projects/project-2.jpg",
    details:
      "Supports fund transfers, OTP verification, real-time balance updates, security encryption, and more.",
  },
  {
    id: 3,
    title: "AI Chatbot System",
    description: "ML-powered chatbot for automated support.",
    category: "AI / ML",
    image: "/projects/project-3.jpg",
    details:
      "NLP chatbot with auto-learning, FAQ training, multilingual support and workflow automation.",
  },
  {
    id: 4,
    title: "Data Analytics Dashboard",
    description: "Real-time charts, metrics & insights.",
    category: "Data Science",
    image: "/projects/project-4.jpg",
    details:
      "Live dashboard with KPIs, forecasting, visual reports, dark mode, and API-based data sync.",
  },
  {
    id: 5,
    title: "Cloud Management Tool",
    description: "Server monitoring & automated scaling.",
    category: "Cloud",
    image: "/projects/project-5.jpg",
    details:
      "Cloud alerts, CPU monitoring, auto-scaling rules, billing insights, and multi-cloud support.",
  },
  {
    id: 6,
    title: "IoT Smart Home System",
    description: "Device automation for smart home control.",
    category: "IoT",
    image: "/projects/project-6.jpg",
    details:
      "Controls lights, sensors, cameras, automation routines, live monitoring, and mobile dashboards.",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
              className={`group relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer h-80 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* DARK OVERLAY (NOT CLICKABLE) */}
              <div className="absolute inset-0 bg-black/70 group-hover:bg-black/80 transition-all duration-300 pointer-events-none"></div>

              {/* CONTENT (CLICKABLE) */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white pointer-events-auto">
                <div>
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-4 backdrop-blur-sm">
                    {project.category}
                  </span>

                  <h3 className="text-2xl font-bold mb-3">
                    {project.title}
                  </h3>
                </div>

                <div>
                  <p className="text-sm opacity-90 mb-4">
                    {project.description}
                  </p>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
                  >
                    Read More <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP WINDOW */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[999]">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold mb-3">
              {selectedProject.title}
            </h3>

            <p className="text-gray-700 text-sm whitespace-pre-line">
              {selectedProject.details}
            </p>

            <button
              onClick={() => setSelectedProject(null)}
              className="mt-5 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
