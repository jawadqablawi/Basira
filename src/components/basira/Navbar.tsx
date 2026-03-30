import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  { label: "الفعاليات", href: "/activities" },
  { label: "المقالات", href: "/articles" },
  { label: "الفريق", href: "/team" },
  { label: "تواصل معنا", href: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(location.pathname);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    setActiveSection(location.pathname);
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const goToPage = (href: string) => {
    setMobileOpen(false);
    navigate(href);
  };

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 h-20 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-md"
          : "bg-white/65 backdrop-blur-sm"
      }`}
    >
      <div className="container flex items-center justify-between h-full">
        <img
          src="/logo.svg"
          alt="Basira Logo"
          className="w-32 md:w-40 h-auto object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] transition duration-300 hover:scale-105 hover:drop-shadow-[0_6px_15px_rgba(0,0,0,0.5)]"
        />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => goToPage(link.href)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:text-primary hover:bg-primary/5"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-xl p-4 animate-scale-in">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => goToPage(link.href)}
              className={`block w-full text-right px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:text-primary"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
} 