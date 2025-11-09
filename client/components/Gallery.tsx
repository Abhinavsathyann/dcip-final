import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";

interface GalleryImage {
  id: number;
  title: string;
  color: string;
  size?: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    title: "Batch Opening Ceremony",
    color: "from-blue-400 to-blue-600",
    size: "md:col-span-2 md:row-span-2",
  },
  { id: 2, title: "Workshop Session", color: "from-purple-400 to-purple-600" },
  { id: 3, title: "Team Collaboration", color: "from-pink-400 to-pink-600" },
  { id: 4, title: "Project Showcase", color: "from-green-400 to-green-600" },
  {
    id: 5,
    title: "Networking Event",
    color: "from-orange-400 to-orange-600",
    size: "md:col-span-2",
  },
  { id: 6, title: "Mentor Session", color: "from-indigo-400 to-indigo-600" },
  { id: 7, title: "Graduation Day", color: "from-red-400 to-red-600" },
  { id: 8, title: "Success Stories", color: "from-cyan-400 to-cyan-600" },
  {
    id: 9,
    title: "Campus Tour",
    color: "from-yellow-400 to-yellow-600",
    size: "md:col-span-2 md:row-span-2",
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

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

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="section-heading mb-12">Gallery</h2>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ${
                image.size || ""
              } ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              style={{
                transitionDelay: isVisible ? `${index * 50}ms` : "0ms",
              }}
              onClick={() => setSelectedImage(image)}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${image.color}`}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center text-white">
                  <h3 className="text-xl md:text-2xl font-bold">
                    {image.title}
                  </h3>
                  <p className="text-sm mt-2 opacity-80">Click to expand</p>
                </div>
              </div>

              {/* Icon indicator */}
              <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-2xl w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div
              className={`relative w-full h-96 rounded-xl overflow-hidden bg-gradient-to-br ${selectedImage.color}`}
            >
              <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center">
                <h3 className="text-3xl font-bold text-white text-center">
                  {selectedImage.title}
                </h3>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
              title="Close"
            >
              <X size={24} />
            </button>

            {/* Info */}
            <div className="mt-6 text-white text-center">
              <p className="text-gray-300">Gallery image #{selectedImage.id}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
