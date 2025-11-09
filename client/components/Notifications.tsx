import { useRef, useEffect, useState } from "react";
import { Bell, ChevronRight } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  category: string;
  isNew: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "Batch 5 Applications Open",
    message:
      "Applications are now open for our upcoming batch. Interested candidates can apply through the portal.",
    date: "2024-01-15",
    category: "Announcement",
    isNew: true,
  },
  {
    id: 2,
    title: "Workshop: React & Next.js",
    message:
      "Join us for an intensive workshop on modern React development with Next.js framework.",
    date: "2024-01-12",
    category: "Event",
    isNew: true,
  },
  {
    id: 3,
    title: "Placement Drive Success",
    message:
      "We're proud to announce successful placements for 95% of our Batch 4 interns at top tech companies.",
    date: "2024-01-10",
    category: "Success",
    isNew: false,
  },
  {
    id: 4,
    title: "Internship Projects Deadline",
    message:
      "Final submission deadline for internship projects is extended to January 31st, 2024.",
    date: "2024-01-08",
    category: "Deadline",
    isNew: false,
  },
  {
    id: 5,
    title: "Guest Lecture: AI Future",
    message:
      "Industry expert will conduct a guest lecture on the future of Artificial Intelligence and Machine Learning.",
    date: "2024-01-05",
    category: "Event",
    isNew: false,
  },
];

export default function Notifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayedNotifications, setDisplayedNotifications] = useState(
    notifications.slice(0, 3),
  );

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Announcement":
        return "from-blue-400 to-blue-600";
      case "Event":
        return "from-purple-400 to-purple-600";
      case "Success":
        return "from-green-400 to-green-600";
      case "Deadline":
        return "from-orange-400 to-orange-600";
      default:
        return "from-primary to-secondary";
    }
  };

  return (
    <section
      id="notifications"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="section-heading mb-12">Latest Notifications</h2>

        <div className="space-y-4">
          {displayedNotifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`glass-effect p-6 rounded-lg border border-white/40 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 cursor-pointer group hover:scale-105 transform ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${getCategoryColor(notification.category)} rounded-lg flex items-center justify-center shadow-md`}
                  >
                    <Bell size={20} className="text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {notification.title}
                      </h3>
                      {notification.isNew && (
                        <span className="inline-block px-2 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                          New
                        </span>
                      )}
                    </div>

                    <p className="text-muted-foreground mb-3 text-sm line-clamp-2">
                      {notification.message}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-block px-2 py-1 bg-gray-100 rounded text-foreground font-medium">
                        {notification.category}
                      </span>
                      <span>
                        {new Date(notification.date).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "short", day: "numeric" },
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-all duration-300">
            View All Notifications
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
