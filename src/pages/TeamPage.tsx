import Navbar from "@/components/basira/Navbar";
import TeamSection from "@/components/basira/TeamSection";
import Footer from "@/components/basira/Footer";

const TeamPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <TeamSection />
      </div>
      <Footer />
    </div>
  );
};

export default TeamPage;