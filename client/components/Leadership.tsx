import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Crown, Award, Zap } from "lucide-react";

interface LeadershipMember {
  id: number;
  name: string;
  role: string;
  department: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  photo?: string;
}

const leadershipData: LeadershipMember[] = [
  {
    id: 1,
    name: "District Collector",
    role: "Chief Administrator",
    department: "District Administration",
    description: "Overall vision and strategic direction for DCIP program",
    icon: <Crown size={40} />,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    name: "Program Coordinator",
    role: "Project Lead",
    department: "DCIP Coordination",
    description: "Day-to-day coordination and internship management",
    icon: <Zap size={40} />,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 3,
    name: "Technical Mentor",
    role: "Innovation Head",
    department: "Digital Transformation",
    description: "Guides digital initiatives and tech projects",
    icon: <Award size={40} />,
    color: "from-pink-500 to-pink-600",
  },
];

export default function Leadership() {
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

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="leadership"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden"
    >
      {/* Background animation */}
      <motion.div
        className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-3xl -z-10"
        animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tr from-secondary/15 to-transparent rounded-full blur-3xl -z-10"
        animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="section-heading mb-4">Leadership & Coordination</h2>
            <p className="section-subheading text-muted-foreground">
              Meet the dedicated team driving DCIP's vision and mission forward
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-6"></div>
          </motion.div>

          {/* Leadership Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {leadershipData.map((leader, index) => (
              <motion.div
                key={leader.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Top border accent */}
                <motion.div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${leader.color}`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Card content */}
                <div className="relative z-10 p-8 text-center">
                  {/* Icon */}
                  <motion.div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${leader.color} flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:shadow-xl`}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                  >
                    {leader.icon}
                  </motion.div>

                  {/* Name */}
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text transition-all duration-300">
                    {leader.name}
                  </h3>

                  {/* Role */}
                  <motion.div
                    className={`inline-block px-4 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${leader.color} mb-3`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {leader.role}
                  </motion.div>

                  {/* Department */}
                  <p className="text-sm text-muted-foreground font-semibold mb-4">
                    {leader.department}
                  </p>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {leader.description}
                  </p>

                  {/* Button */}
                  <motion.button
                    className={`w-full px-4 py-3 rounded-xl font-semibold bg-gradient-to-r ${leader.color} text-white hover:shadow-lg transition-all`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                  </motion.button>
                </div>

                {/* Decorative accent */}
                <div
                  className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-tl ${leader.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
