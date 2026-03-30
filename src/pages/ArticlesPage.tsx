import Navbar from "@/components/basira/Navbar";
import ArticlesSection from "@/components/basira/ArticlesSection";
import Footer from "@/components/basira/Footer";

const ArticlesPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <ArticlesSection />
      </div>
      <Footer />
    </div>
  );
};

export default ArticlesPage;