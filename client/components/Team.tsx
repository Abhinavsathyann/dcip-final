import { useRef, useEffect, useState } from "react";
import { Linkedin, Instagram, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TeamMember {
  id: number;
  name: string;
  college: string;
  course: string;
  photo: string;
  linkedin?: string;
  instagram?: string;
}

interface BatchData {
  [key: number]: TeamMember[];
}

const teamData: BatchData = {
  5: [
    {
      id: 25,
      name: "Zara Khan",
      college: "NIT Calicut",
      course: "B.Tech CSE",
      photo: "/images/zara-khan.jpg",
      linkedin: "#",
      instagram: "#",
    },

  ],
  6: [
    {
      id: 31,
      name: "Jumaila Fidha",
      college: "University of Kerala",
      course: "MA Public Administration",
      photo: "Assets/images/jummu.jpg",
      linkedin: "#",
      instagram: "#",
    },
    {
      id: 32,
      name: "Afrah",
      college: "Lakshmibhai college ,University of Delhi ",
      course: "B.com ",
      photo: "Assets/images/Afrah.jpg",
      linkedin: "#",
      instagram: "#",
    },
    {
      id: 33,
      name: "Vishnupriya A",
      college: "Gov.t Arts and science college Calicut",
      course: "BA History",
      photo: "Assets/images/VISHNUPRIYA.jpg",
      linkedin: "#",
      instagram: "#",
    },
    {
      id: 34,
      name: "Ayisha Hida O",
      college: "University of Kerala",
      course: "MA Political Science",
      photo: "Assets/images/Hida.jpg",
      linkedin: "#",
      instagram: "#",
    },
    {
      id: 35,
      name: "Ayisha Shahma P P",
      college: "University of Hyderabad",
      course: "PG Sociology",
      photo: "Assets/images/shahma.jpg",
      linkedin: "#",
      instagram: "#",
    },
    {
      id: 36,
      name: "Fathima Rana Foumi",
      college: "Chennai University",
      course: "Sociology",
      photo: "Assets/images/RANA.jpg", // ✅ Example: stored in public/images/
      linkedin: "#",
      instagram: "#",
    },
    {
      id: 36,
      name: "Binisha M",
      college: "NA",
      course: "NA",
      photo: "Assets/images/BINISHA .jpg", 
      linkedin: "#",
      instagram: "#",
    },
      {
      id: 36,
      name: "Devadathan P K",
      college: "University of Delhi ",
      course: "NA",
      photo: "Assets/images/Devadathan.jpg", 
      linkedin: "#",
      instagram: "#",
    },
        {
      id: 36,
      name: "Abhinav K",
      college: "KPTC",
      course: "Computer Engineering",
      photo: "Assets/images/Abhinav.jpg", 
      linkedin: "#",
      instagram: "#",
    },
  ],
};

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedBatch, setSelectedBatch] = useState(6);
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

  const currentTeam = teamData[selectedBatch as keyof BatchData];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden"
    >
      {/* Background elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl -z-10"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-4">
            <h2 className="section-heading mb-3">Meet Our Team</h2>
            <p className="section-subheading mb-2">Current Batches & Interns</p>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </motion.div>

          {/* Batch Selector */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center mb-16"
          >
            <div className="flex gap-4 items-center p-2 bg-white rounded-2xl shadow-lg border border-gray-100">
              {[5, 6].map((batch) => (
                <motion.button
                  key={batch}
                  onClick={() => setSelectedBatch(batch)}
                  className="relative px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {selectedBatch === batch && (
                    <motion.div
                      layoutId="batchSelector"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  <span
                    className={`relative z-10 flex items-center gap-2 ${
                      selectedBatch === batch
                        ? "text-white"
                        : "text-foreground group-hover:text-primary"
                    }`}
                  >
                    <motion.div
                      animate={
                        selectedBatch === batch ? { rotate: 360 } : { rotate: 0 }
                      }
                      transition={{ duration: 0.5 }}
                      className="w-5 h-5 flex items-center justify-center font-bold"
                    >
                      {batch}
                    </motion.div>
                    Batch {batch}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Team Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedBatch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentTeam.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Card content */}
                  <div className="relative z-10 p-6 sm:p-8">
                    {/* Avatar section */}
                    <motion.div
                      className="mb-6 flex justify-center"
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -m-2"></div>

                        {/* Avatar image */}
                        <img
                          src={member.photo}
                          alt={member.name}
                          loading="lazy"
                          className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:shadow-xl transition-all duration-300"
                        />

                        {/* Status badge */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 rounded-full border-3 border-white shadow-lg"
                        />
                      </div>
                    </motion.div>

                    {/* Info section */}
                    <div className="text-center mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1 line-clamp-1">
                        {member.college}
                      </p>
                      <p className="text-xs font-semibold text-primary/80">
                        {member.course}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>

                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-3">
                      <motion.a
                        href={member.linkedin || "#"}
                        className="p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        title="LinkedIn"
                      >
                        <Linkedin size={18} />
                      </motion.a>
                      <motion.a
                        href={member.instagram || "#"}
                        className="p-2 rounded-full bg-gray-100 hover:bg-secondary hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        title="Instagram"
                      >
                        <Instagram size={18} />
                      </motion.a>
                      <motion.a
                        href={`mailto:${member.name.toLowerCase().replace(/\s+/g, ".")}@dcip.edu`}
                        className="p-2 rounded-full bg-gray-100 hover:bg-accent hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        title="Email"
                      >
                        <Mail size={18} />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
