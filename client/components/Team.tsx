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
      name: "Anusha K P",
      college: "St. Joseph's College Devagiri, Calicut",
      course: "MA Economics",
      photo: "Assets/images/Anusha.jpg",
      linkedin: "#",
      instagram: "#",
    },
    {
      id: 26,
      name: "Shiyas Ahammed",
      college: "M.E.S College of Engineering",
      course: "B.Tech AI & DS",
      photo: "Assets/images/Shiyas.jpg",
      linkedin: "#",
      instagram: "#",
    },
    {
      id: 27,
      name: "Muhammed Nisar K",
      college: "Thunchath Ezhuthachan Malayalam University",
      course: "MA Journalism & Mass Communication",
      photo: "Assets/images/Nisar.jpg",
      linkedin: "#",
      instagram: "#",
    },
  ],
  6: [
    {
      id: 28,
      name: "Jumaila Fidha",
      college: "University of Kerala",
      course: "MA Public Administration",
      photo: "Assets/images/Jumaila.jpg",
      linkedin: "https://in.linkedin.com/in/jumaila-fidha-6377b2291",
      instagram:
        "https://www.instagram.com/jumaila_fidha?igsh=MWN1aGptYWJrenZzaw==",
    },
    {
      id: 29,
      name: "Afrah",
      college: "Lakshmibhai College, University of Delhi",
      course: "B.Com",
      photo: "Assets/images/Afrah.jpg",
      linkedin:
        "https://in.linkedin.com/in/afrah-ibrahim-veloor-valappil-908446367",
      instagram:
        "https://www.instagram.com/afraaah.ibrahim/?utm_source=ig_web_button_share_sheet",
    },
    {
      id: 30,
      name: "Vishnupriya A",
      college: "Govt. Arts and Science College Calicut",
      course: "BA History",
      photo: "Assets/images/Vishnupriya.jpg",
      linkedin: "www.linkedin.com/in/vishnupriya-a-1160a1248",
      instagram:
        "https://www.instagram.com/invites/contact/?igsh=k7ppl6enle6c&utm_content=5o180qz",
    },
    {
      id: 31,
      name: "Ayisha Hida O",
      college: "University of Kerala",
      course: "MA Political Science",
      photo: "Assets/images/Hida.jpg",
      linkedin: "www.linkedin.com/in/ayisha-hida-o-067b64341",
      instagram:
        "https://www.instagram.com/ayshaa_hida?igsh=MWppcXZudDdqaHRiaA==",
    },
    {
      id: 32,
      name: "Ayisha Shahma P P",
      college: "University of Hyderabad",
      course: "PG Sociology",
      photo: "Assets/images/Shahma.jpg",
      linkedin: "#",
      instagram: "#",
    },
    {
      id: 33,
      name: "Fathima Rana Foumi",
      college: "Chennai University",
      course: "Sociology",
      photo: "Assets/images/Rana.jpg",
      linkedin: "www.linkedin.com/in/rana-foumi",
      instagram: "https://www.instagram.com/_._ranaah?igsh=b3BvamJ4MTFxYXhi",
    },
    {
      id: 34,
      name: "Binisha M",
      college: "Kerala Media Academy",
      course: "PG Diploma Journalism & Communication",
      photo: "Assets/images/Binisha.jpg",
      linkedin:
        "https://www.linkedin.com/in/bini-binisha-0b16a82b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ",
      instagram:
        "https://www.instagram.com/_bini_m?igsh=MTZjazJ2MWszeXp4OQ==",
    },
    {
      id: 35,
      name: "Devadathan P K",
      college: "University of Delhi",
      course: "BA Political Science (Hons)",
      photo: "Assets/images/Devadathan.jpg",
      linkedin:
        "https://www.linkedin.com/in/devadathan-p-k-857b77267?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram:
        "https://www.instagram.com/_dathanism_?igsh=MWQzZ3JzOWRreWR4cg==",
    },
    {
      id: 36,
      name: "Abhinav K",
      college: "KPTC",
      course: "Computer Engineering",
      photo: "Assets/images/Abhinav.jpg",
      linkedin: "www.linkedin.com/in/abhinavksathyan",
      instagram:
        "https://www.instagram.com/abhinavvhh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const currentTeam = teamData[selectedBatch] || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
      {/* Background blur */}
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

          {/* BATCH SELECTOR - MOBILE SCROLLABLE */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-16"
          >
            <div
              className="
                flex gap-3 items-center p-2 bg-white rounded-2xl shadow-lg border border-gray-100 
                overflow-x-auto whitespace-nowrap no-scrollbar max-w-full
              "
            >
              {[1, 2, 3, 4, 5, 6].map((batch) => (
                <motion.button
                  key={batch}
                  onClick={() => setSelectedBatch(batch)}
                  className="
                    relative px-4 py-2 rounded-xl font-semibold 
                    text-sm md:text-lg transition-all duration-300 overflow-hidden group
                    min-w-[100px] text-center
                  "
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
                    className={`relative z-10 flex items-center justify-center gap-1 ${
                      selectedBatch === batch
                        ? "text-white"
                        : "text-foreground group-hover:text-primary"
                    }`}
                  >
                    {batch}
                    <span>Batch {batch}</span>
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* TEAM GRID */}
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
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 p-6 sm:p-8">
                    <motion.div
                      className="mb-6 flex justify-center"
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -m-2"></div>

                        <img
                          src={member.photo}
                          alt={member.name}
                          loading="lazy"
                          className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:shadow-xl transition-all duration-300"
                        />

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 rounded-full border-3 border-white shadow-lg"
                        />
                      </div>
                    </motion.div>

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

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>

                    <div className="flex items-center justify-center gap-3">
                      <motion.a
                        href={member.linkedin}
                        target="_blank"
                        className="p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Linkedin size={18} />
                      </motion.a>

                      <motion.a
                        href={member.instagram}
                        target="_blank"
                        className="p-2 rounded-full bg-gray-100 hover:bg-secondary hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Instagram size={18} />
                      </motion.a>

                      <motion.a
                        className="p-2 rounded-full bg-gray-100 hover:bg-accent hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
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
