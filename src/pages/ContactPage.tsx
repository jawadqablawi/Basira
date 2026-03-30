import Navbar from "@/components/basira/Navbar";
import NewsletterSection from "@/components/basira/NewsletterSection";
import Footer from "@/components/basira/Footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <NewsletterSection />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;