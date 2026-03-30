import Navbar from "@/components/basira/Navbar";
import ActivitiesSection from "@/components/basira/ActivitiesSection";
import Footer from "@/components/basira/Footer";

const ActivitiesPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <ActivitiesSection />
      </div>
      <Footer />
    </div>
  );
};

export default ActivitiesPage;