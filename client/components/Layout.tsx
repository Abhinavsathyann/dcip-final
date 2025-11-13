import { useEffect, useState } from "react";
import {
  ChevronUp,
  Mail,
  Linkedin,
  Instagram,
  Github,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Update active section
      const sections = ["home", "about", "team", "highlights", "projects"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Header/Navigation */}
      <motion.header
        className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-border shadow-sm z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                className="w-10 h-10  from-primary to-secondary rounded-lg flex items-center justify-center"
  whileHover={{ rotate: 5 }}
  transition={{ type: "spring", stiffness: 300 }}
              >
               <img
    src="/Assets/images/dciplogo.png"
    alt="DCIP Logo"
    className="w-7 h-7 object-contain"
  />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  DCIP
                </h1>
                <p className="text-xs text-muted-foreground">Malappuram</p>
              </div>
            </motion.div>

            <nav className="hidden md:flex items-center gap-8">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "team", label: "Team" },
                { id: "highlights", label: "Highlights" },
                { id: "projects", label: "Projects" },
              ].map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-sm font-medium transition-all duration-300 pb-2 relative ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <motion.button
                className="hidden sm:block btn-glow text-sm font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply Now
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Toggle menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {mobileMenuOpen ? (
                    <X size={24} className="text-foreground" />
                  ) : (
                    <Menu size={24} className="text-foreground" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                className="md:hidden border-t border-border mt-4 pt-4 pb-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  {[
                    { id: "home", label: "Home" },
                    { id: "about", label: "About" },
                    { id: "team", label: "Team" },
                    { id: "highlights", label: "Highlights" },
                    { id: "projects", label: "Projects" },
                    { id: "faq", label: "FAQ" },
                    { id: "contact", label: "Contact" },
                  ].map((item, index) => (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block px-4 py-2 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                  <motion.button
                    className="w-full btn-glow text-sm mt-4 font-semibold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    Apply Now
                  </motion.button>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold mb-4">DCIP Malappuram</h3>
              <p className="text-gray-300 text-sm">
                Digital Career Internship Program aimed at grooming young
                talents in the district.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <motion.a
                    href="#home"
                    className="hover:text-primary transition-colors inline-block"
                    whileHover={{ x: 5 }}
                  >
                    Home
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#about"
                    className="hover:text-primary transition-colors inline-block"
                    whileHover={{ x: 5 }}
                  >
                    About
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#team"
                    className="hover:text-primary transition-colors inline-block"
                    whileHover={{ x: 5 }}
                  >
                    Team
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#faq"
                    className="hover:text-primary transition-colors inline-block"
                    whileHover={{ x: 5 }}
                  >
                    FAQ
                  </motion.a>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Email: info@dcip.org</p>
                <p>Phone: +91 XXXXX XXXXX</p>
                <p>Location: Malappuram, Kerala</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex items-center gap-4">
                <motion.a
                  href="#"
                  className="hover:text-primary transition-colors"
                  title="LinkedIn"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  className="hover:text-primary transition-colors"
                  title="Instagram"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  className="hover:text-primary transition-colors"
                  title="Email"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mail size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  className="hover:text-primary transition-colors"
                  title="Github"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github size={20} />
                </motion.a>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-slate-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2025 DCIP Malappuram. All rights reserved.</p>
            <div className="flex gap-6">
              <motion.a
                href="#"
                className="hover:text-primary transition-colors"
                whileHover={{ x: 2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-primary transition-colors"
                whileHover={{ x: 2 }}
              >
                Terms of Service
              </motion.a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-primary to-secondary text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-40"
            title="Back to top"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
