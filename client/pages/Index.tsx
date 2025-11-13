import { useEffect, useState, Suspense, lazy } from "react";
import Layout from "../components/Layout";
import LoadingScreen from "../components/LoadingScreen";
import Hero from "../components/Hero";
import About from "../components/About";
import Timeline from "../components/Timeline";
import Team from "../components/Team";
// import Leadership from "../components/Leadership";
import CitizenServices from "../components/CitizenServices";
import TemporaryAccess from "../components/TemporaryAccess";
import Testimonials from "../components/Testimonials";
import DcipAiChatbot from "../components/DcipAiChatbot";

// Lazy load non-critical components
const CollectorSection = lazy(() => import("../components/CollectorSection"));
const HighlightsCarousel = lazy(() => import("../components/HighlightsCarousel"));
const Projects = lazy(() => import("../components/Projects"));
const Gallery = lazy(() => import("../components/Gallery"));
// const Notifications = lazy(() => import("../components/Notifications"));
const Faq = lazy(() => import("../components/Faq"));
// const News = lazy(() => import("../components/News"));
const Apply = lazy(() => import("../components/Apply"));

const SectionLoader = () => (
  <div className="h-96 bg-gradient-to-b from-gray-100 to-gray-50 animate-pulse rounded-lg"></div>
);

export default function Index() {
  const [showLoading, setShowLoading] = useState(true);
  const [restricted, setRestricted] = useState(true);

  useEffect(() => {
    const key = localStorage.getItem("dcip-access-key");
    if (key === "dcip2025") {
      setRestricted(false);
    }
  }, []);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("dcip-visited");
    if (hasVisited) {
      setShowLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    sessionStorage.setItem("dcip-visited", "true");
  };

  // ✅ Show restricted page if not unlocked
  if (restricted) {
    return <TemporaryAccess />;
  }

  // ✅ Show loading screen (only on first load)
  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  // ✅ Show full site once unlocked
  return (
    <Layout>
      <Hero />
      <About />
      <Timeline />
      <Team />
      {/* <Leadership /> */}
      <CitizenServices />
      <DcipAiChatbot />
      <Suspense fallback={<SectionLoader />}>
        <CollectorSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <HighlightsCarousel />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Gallery />
      </Suspense>

      {/* <Suspense fallback={<SectionLoader />}>
        <Notifications />
      </Suspense> */}

      <Suspense fallback={<SectionLoader />}>
        <Faq />
      </Suspense>

      {/* <Suspense fallback={<SectionLoader />}>
        <News />
      </Suspense> */}

      <Suspense fallback={<SectionLoader />}>
      <Testimonials />
        <Apply />
      </Suspense>
    </Layout>
  );
}
