import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Award, Users, Zap, TrendingUp } from "lucide-react";

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  achievements: string[];
}

const timelineData: TimelineEvent[] = [
  {
    year: 2020,
    title: "DCIP Founded",
    description:
      "The District Collector Internship Program was established to empower youth through experiential learning in governance.",
    icon: <Zap size={32} />,
    color: "from-blue-500 to-blue-600",
    achievements: [
      "Vision Launched",
      "Governance Initiative",
      "District Collector Partnership",
    ],
  },
  {
    year: 2021,
    title: "1st Batch Launched",
    description:
      "The first cohort of interns began their journey, working directly with district administration and key departments.",
    icon: <Users size={32} />,
    color: "from-purple-500 to-purple-600",
    achievements: [
      "50+ Interns Onboarded",
      "First Projects Initiated",
      "Community Engagement",
    ],
  },
  {
    year: 2022,
    title: "2nd Batch & Major Growth",
    description:
      "Expanded program with increased placements and recognition for excellent intern performance and project deliverables.",
    icon: <Award size={32} />,
    color: "from-pink-500 to-pink-600",
    achievements: [
      "100+ Interns Trained",
      "50+ Placements",
      "Innovation Projects",
    ],
  },
  {
    year: 2024,
    title: "Milestone Achievement",
    description:
      "Reached significant growth with 500+ interns trained, 100+ successful placements, and expanded across 6 batches.",
    icon: <TrendingUp size={32} />,
    color: "from-cyan-500 to-cyan-600",
    achievements: [
      "500+ Interns Trained",
      "100+ Placements",
      "6 Active Batches",
      "Leadership Recognition",
    ],
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTimeline, setActiveTimeline] = useState(0);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
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
      id="timeline"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl -z-10"
        animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl -z-10"
        animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      ></motion.div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="section-heading mb-4">Our Journey</h2>
            <p className="section-subheading text-muted-foreground mb-2">
              From vision to impact: A timeline of DCIP's growth and
              achievements
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4"></div>
          </motion.div>

          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <motion.div className="relative">
              {/* Center line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent transform -translate-x-1/2"></div>

              {/* Timeline items */}
              <div className="space-y-12">
                {timelineData.map((event, index) => (
                  <motion.div
                    key={event.year}
                    variants={itemVariants}
                    className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    {/* Content */}
                    <div className="w-1/2 px-8">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className={`text-4xl font-bold bg-gradient-to-r ${event.color} bg-clip-text text-transparent`}
                          >
                            {event.year}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {event.description}
                        </p>

                        {/* Achievements */}
                        <div className="flex flex-wrap gap-2">
                          {event.achievements.map((achievement, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.1 }}
                              className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${event.color} text-white`}
                            >
                              {achievement}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Center icon */}
                    <div className="w-0 flex justify-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        }}
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center text-white shadow-lg border-4 border-white relative z-10`}
                      >
                        {event.icon}
                      </motion.div>
                    </div>

                    {/* Spacer */}
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden">
            <motion.div className="space-y-8">
              {timelineData.map((event, index) => (
                <motion.div
                  key={event.year}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Vertical line indicator */}
                  {index !== timelineData.length - 1 && (
                    <div className="absolute left-6 top-20 w-1 h-12 bg-gradient-to-b from-primary to-secondary"></div>
                  )}

                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center text-white shadow-lg border-4 border-white mb-4`}
                  >
                    {event.icon}
                  </motion.div>

                  {/* Content card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 ml-4"
                  >
                    <span
                      className={`text-3xl font-bold bg-gradient-to-r ${event.color} bg-clip-text text-transparent`}
                    >
                      {event.year}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mt-2 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {event.description}
                    </p>

                    {/* Achievements */}
                    <div className="flex flex-wrap gap-2">
                      {event.achievements.map((achievement, idx) => (
                        <span
                          key={idx}
                          className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${event.color} text-white`}
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Stats section below timeline */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20 pt-20 border-t border-gray-200"
          >
            {[
              // { label: "Years of Excellence", value: "4+" },
              // { label: "Total Interns", value: "500+" },
              // { label: " ", value: "100+" },
              // { label: "Active Batches", value: "6" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.2,
                  }}
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-muted-foreground font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
