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
  const cursorRef = useRef<HTMLDivElement>(null);

  /* ==========================================
        DEVICE CHECK → DESKTOP ONLY LOGIC
     ========================================== */
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  /* ==========================================
        3D CURSOR ANIMATION (DESKTOP ONLY)
     ========================================== */
  useEffect(() => {
    if (!isDesktop) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    const speed = 0.15;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop]);

  /* ==========================================
                SCROLL APPEAR
     ========================================== */
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

  /* ==========================================
                 FEATURES
     ========================================== */
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
          {/* HEADER */}
          <motion.div variants={itemVariants} className="text-center mb-6">
            <h2 className="section-heading mb-4">What is DCIP?</h2>
            <p className="section-subheading text-muted-foreground">
              A transformative government initiative bridging academics and
              administration
            </p>
          </motion.div>

          {/* INTRO CARD */}
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
                  The District Collector Internship Program (DCIP) equips young talents with real-time exposure to district administration, governance processes, and public service initiatives enabling them to develop practical skills, leadership qualities, and a deeper understanding of how government systems function.
                </p>
              </div>

              {/* ILLUSTRATION */}
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden"
              >
                <img
                  src="Assets/images/dciplogo.png"
                  alt="DCIP Logo"
                  className="relative z-10 w-40 md:w-56 object-contain opacity-90 drop-shadow-lg"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* FEATURES */}
          <motion.div variants={itemVariants} className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground">
              Why Choose DCIP?
            </h3>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Unlock your potential through hands-on governance and leadership
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

          {/* 4D DCIP MALAPPURAM TEXT — DESKTOP ONLY */}
          {isDesktop && (
            <motion.div
              className="flex flex-col items-center justify-center py-20 select-none"
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <motion.h1
                className="relative text-5xl md:text-7xl font-extrabold text-center leading-tight"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="absolute inset-0 text-black/20 translate-x-2 translate-y-2 blur-md">
                  DCIP MALAPPURAM
                </span>

                <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent blur-xl opacity-40">
                  DCIP MALAPPURAM
                </span>

                <span className="relative bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-2xl">
                  DCIP MALAPPURAM
                </span>
              </motion.h1>

              <motion.div
                className="mt-4 h-1 w-32 bg-gradient-to-r from-primary via-secondary to-accent rounded-full shadow-lg"
                animate={{ width: ["40%", "80%", "40%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* 3D CURSOR — ONLY ON DESKTOP */}
      {isDesktop && (
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999]
          bg-gradient-to-br from-primary to-secondary opacity-70 blur-[2px]
          mix-blend-screen transform -translate-x-1/2 -translate-y-1/2"
        ></div>
      )}
    </section>
  );
}
