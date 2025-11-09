import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  MessageSquare,
  Download,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  Bell,
} from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  action: string;
}

const servicesData: Service[] = [
  {
    id: 1,
    title: "Online Application",
    description: "Apply for DCIP internship with a simple, user-friendly form",
    icon: <FileText size={40} />,
    color: "from-blue-500 to-blue-600",
    features: ["Quick Registration", "Real-time Tracking", "Document Upload"],
    action: "Apply Now",
  },
  {
    id: 2,
    title: "Support Center",
    description: "Get instant help with FAQs, chatbot, and contact support",
    icon: <MessageSquare size={40} />,
    color: "from-purple-500 to-purple-600",
    features: ["24/7 Chat Support", "FAQ Database", "Ticketing System"],
    action: "Get Help",
  },
  {
    id: 3,
    title: "Resources & Guides",
    description: "Download templates, guidelines, and internship resources",
    icon: <Download size={40} />,
    color: "from-pink-500 to-pink-600",
    features: ["Report Templates", "Learning Materials", "Best Practices"],
    action: "Download",
  },
  {
    id: 4,
    title: "Events & Schedule",
    description: "Stay updated with internship events and important dates",
    icon: <Calendar size={40} />,
    color: "from-cyan-500 to-cyan-600",
    features: ["Event Calendar", "Notifications", "Reminders"],
    action: "View Calendar",
  },
  {
    id: 5,
    title: "Community Forum",
    description: "Connect with interns, share experiences, and ask questions",
    icon: <Users size={40} />,
    color: "from-green-500 to-green-600",
    features: ["Discussion Boards", "Peer Support", "Best Experiences"],
    action: "Join Forum",
  },
  {
    id: 6,
    title: "Progress & Analytics",
    description: "Track your internship progress with detailed analytics",
    icon: <TrendingUp size={40} />,
    color: "from-orange-500 to-orange-600",
    features: ["Performance Metrics", "Goal Tracking", "Certificates"],
    action: "View Dashboard",
  },
];

export default function CitizenServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);

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
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden"
    >
      {/* Background elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/12 to-transparent rounded-full blur-3xl -z-10"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute -bottom-40 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/12 to-transparent rounded-full blur-3xl -z-10"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      ></motion.div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="section-heading mb-4">Citizen Services & Support</h2>
            <p className="section-subheading text-muted-foreground">
              Comprehensive tools and resources to support your DCIP journey and
              engagement
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-6"></div>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                onHoverStart={() => setSelectedService(service.id)}
                onHoverEnd={() => setSelectedService(null)}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 cursor-pointer"
              >
                {/* Top gradient accent */}
                <motion.div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>

                {/* Card content */}
                <div className="relative z-10 p-8">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-5 shadow-lg`}
                    animate={{
                      rotate: selectedService === service.id ? 10 : 0,
                      scale: selectedService === service.id ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text transition-all duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Features */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={
                      selectedService === service.id
                        ? { opacity: 1, height: "auto" }
                        : { opacity: 0, height: 0 }
                    }
                    transition={{ duration: 0.2 }}
                    className="mb-5 overflow-hidden"
                  >
                    <div className="space-y-2 pt-3 border-t border-gray-200">
                      {service.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle
                            size={16}
                            className={`text-primary flex-shrink-0`}
                          />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Action button */}
                  <motion.button
                    className={`w-full px-4 py-3 rounded-xl font-bold bg-gradient-to-r ${service.color} text-white hover:shadow-lg transition-all`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {service.action}
                  </motion.button>
                </div>

                {/* Decorative element */}
                <div
                  className={`absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-tl ${service.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                ></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Stats Banner */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border border-primary/20 p-8 md:p-12"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Bell className="text-primary" size={28} />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground">
                  Stay Connected & Informed
                </h3>
              </div>

              <p className="text-muted-foreground mb-6 max-w-2xl">
                Subscribe to our notifications to receive updates about new
                opportunities, events, announcements, and important deadlines.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button
                  className="btn-glow px-8 py-3 font-bold whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
