import SmoothScroll from "@/components/SmoothScroll";
import SceneRoot from "@/components/three/SceneRoot";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Trust from "@/components/sections/Trust";
import Journey from "@/components/sections/Journey";
import Framework from "@/components/sections/Framework";
import CaseStudies from "@/components/sections/CaseStudies";
import AILab from "@/components/sections/AILab";
import Dashboard from "@/components/sections/Dashboard";
import Artifacts from "@/components/sections/Artifacts";
import Testimonials from "@/components/sections/Testimonials";
import ResumeSection from "@/components/sections/ResumeSection";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <SceneRoot />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <Trust />
        <Journey />
        <Framework />
        <CaseStudies />
        <AILab />
        <Dashboard />
        <Artifacts />
        <Testimonials />
        <ResumeSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
