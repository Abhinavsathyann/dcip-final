import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1500; // 5 seconds
    const interval = 50; // Update every 50ms
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white via-blue-50 to-purple-50 flex items-center justify-center z-50 overflow-hidden animate-fade-in">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative text-center z-10">
       {/* Logo Area */}
<div className="mb-8 animate-fade-down">
  <div className="w-24 h-24 mx-auto mb-6  from-primary to-secondary rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
    <img
      src="Assets/images/dciplogo.png" // ✅ Path from public folder
      alt="DCIP Logo"
      className="w-20 h-20 object-contain" // Adjust sizing here
    />
  </div>
  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
    DCIP
  </h1>
  <p className="text-lg text-muted-foreground">Malappuram</p>
</div>


        {/* Circular Progress */}
        <div className="flex justify-center items-center mb-12">
          <div className="relative w-40 h-40">
            {/* Background circle */}
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 160 160"
              fill="none"
            >
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="8"
                className="text-gray-200"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeDasharray={`${440 * (progress / 100)} 440`}
                className="transition-all duration-100"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="hsl(217, 100%, 50%)" />
                  <stop offset="100%" stopColor="hsl(260, 97%, 60%)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Progress text in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {Math.round(progress)}
              </span>
              <span className="text-xs text-muted-foreground mt-1">%</span>
            </div>
          </div>
        </div>

        {/* Loading message */}
        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <p className="text-muted-foreground">Loading amazing content...</p>
          <div className="flex gap-1 justify-center mt-4">
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 bg-secondary rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
