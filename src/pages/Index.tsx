import { useEffect } from "react";
import Navbar from "@/components/basira/Navbar";
import HeroSection from "@/components/basira/HeroSection";
import AboutSection from "@/components/basira/AboutSection";
import StatsSection from "@/components/basira/StatsSection";
import ActivitiesSection from "@/components/basira/ActivitiesSection";
import ArticlesSection from "@/components/basira/ArticlesSection";
import TeamSection from "@/components/basira/TeamSection";
import PartnersSection from "@/components/basira/PartnersSection";
import Footer from "@/components/basira/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "بَصيرة | Basira";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ActivitiesSection />
      <ArticlesSection />
      <TeamSection />
      <PartnersSection />
      <Footer />
    </div>
  );
};

export default Index;