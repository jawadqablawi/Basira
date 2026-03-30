import Navbar from "@/components/basira/Navbar";
import AboutSection from "@/components/basira/AboutSection";
import Footer from "@/components/basira/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;