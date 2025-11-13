import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Lightbulb,
  Users,
  Rocket,
  Target,
  Award,
} from "lucide-react";

export default function About() {
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
      transition: { staggerChildren: 0.15 },
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

  const features = [
    {
      icon: <BookOpen size={32} />,
      title: "Real-World Exposure",
      description:
        "Work directly with District Collector and key government departments in live projects.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Target size={32} />,
      title: "Hands-On Learning",
      description:
        "Gain practical experience in governance, administration, and public service delivery.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: <Users size={32} />,
      title: "Leadership Development",
      description:
        "Build essential soft skills, teamwork, and civic responsibility among peers.",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      icon: <Rocket size={32} />,
      title: "Innovation Hub",
      description:
        "Participate in digital transformation and innovation initiatives at district level.",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
    },
    {
      icon: <Award size={32} />,
      title: "Career Growth",
      description: "Get recognized certificates.",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: <Lightbulb size={32} />,
      title: "Impact Driven",
      description:
        "Contribute to community development and make tangible difference in society.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
    >
      {/* Background Effects */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/8 to-transparent rounded-full blur-3xl -z-10"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/8 to-transparent rounded-full blur-3xl -z-10"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-6">
            <h2 className="section-heading mb-4">What is DCIP?</h2>
            <p className="section-subheading text-muted-foreground">
              A transformative government initiative bridging academics and
              administration
            </p>
          </motion.div>

          {/* Introduction Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="mb-16 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-3xl p-8 md:p-12 border border-primary/10 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  Empowering the Next Generation of Public Service Leaders
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  The District Collector Internship Program (DCIP) is a
                  groundbreaking government initiative designed to provide
                  students with real-time, hands-on exposure to public
                  administration and governance at the district level.
                </p>
                <div className="flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-glow text-sm font-semibold"
                  >
                    Learn More
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-lg font-semibold border-2 border-primary text-primary hover:bg-primary/5 transition-all"
                  >
                    Get Involved
                  </motion.button>
                </div>
              </div>

              {/* Illustration */}
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-64 md:h-80 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 flex items-center justify-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-50"></div>
                <div className="relative z-10 text-6xl md:text-8xl font-bold text-primary/20">
                  DCIP
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* ===== TEMPORARILY REMOVED: MISSION & VISION SECTION ===== */}
          {/* ========================================================= */}

          {/*
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            Mission + Vision original section here…
          </motion.div>
          */}

          {/* Key Features */}
          <motion.div variants={itemVariants} className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground">
              Why Choose DCIP?
            </h3>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Unlock your potential through meaningful engagement with
              governance and public service
            </p>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`group relative overflow-hidden rounded-2xl ${feature.bgColor} p-8 border border-gray-200 hover:border-primary/30 shadow-md hover:shadow-xl transition-all duration-300`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4 shadow-lg relative z-10`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    {feature.icon}
                  </motion.div>

                  <h4 className="text-xl font-bold text-foreground mb-3 relative z-10">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed relative z-10">
                    {feature.description}
                  </p>

                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color}`}
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="mt-20 pt-12 border-t border-gray-200"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "50+", label: "Interns Trained" },
                { value: "6", label: "Active Batches" },
                { value: "2+", label: "Years Strong" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: idx * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.2,
                    }}
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-sm md:text-base text-muted-foreground font-semibold">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
