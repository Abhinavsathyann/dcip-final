import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background with image + gradient overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 blur-[1px] brightness-[0.9]"
          style={{
            backgroundImage:
              "url('https://tse2.mm.bing.net/th/id/OIP.0pRasEHw8758uGoa1nlqjwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3')",
          }}
          animate={{ scale: [1.05, 1.1, 1.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        {/* Soft gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-blue-50/70 to-purple-50/80 backdrop-blur-[2px]"></div>

        {/* Animated glowing shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <motion.div
            className="absolute top-20 -left-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-3xl"
            animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          ></motion.div>
          <motion.div
            className="absolute top-1/2 left-1/3 w-96 h-96 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-full blur-3xl"
            animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          ></motion.div>
        </div>

        {/* Subtle tech grid overlay */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(0deg,transparent_24%,rgba(59,130,246,.08)_25%,rgba(59,130,246,.08)_26%,transparent_27%,transparent_74%,rgba(59,130,246,.08)_75%,rgba(59,130,246,.08)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(59,130,246,.08)_25%,rgba(59,130,246,.08)_26%,transparent_27%,transparent_74%,rgba(59,130,246,.08)_75%,rgba(59,130,246,.08)_76%,transparent_77%,transparent)] bg-[length:50px_50px]"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <h2 className="text-sm md:text-base font-semibold text-primary uppercase tracking-wider mb-4 inline-block px-4 py-2 bg-primary/10 rounded-full">
            Welcome to
          </h2>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
        >
          <motion.span
            className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            DCIP
          </motion.span>
          <motion.span
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl block"
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Malappuram
          </motion.span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Empowering change and fostering growth through hands-on government
          projects
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <motion.button
            className="btn-glow px-8 py-4 text-base font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Explore Now
          </motion.button>
          <motion.button
            className="px-8 py-4 rounded-lg font-semibold border-2 border-primary text-primary hover:bg-primary/5 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(59, 130, 246, 0.05)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2">
          <ChevronDown className="w-6 h-6 text-primary" />
        </div>
      </motion.div>
    </section>
  );
}
