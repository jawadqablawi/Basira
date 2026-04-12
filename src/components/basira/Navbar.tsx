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
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const goToPage = (href: string) => {
    setMobileOpen(false);
    navigate(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 h-20 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-md"
            : "bg-white/65 backdrop-blur-sm"
        }`}
      >
        <div className="container h-full px-4 md:px-6">
          <div className="flex items-center justify-between h-full">
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-foreground h-12 w-12"
              >
                {mobileOpen ? (
                  <X className="h-7 w-7" />
                ) : (
                  <Menu className="h-7 w-7" />
                )}
              </Button>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => goToPage(link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Logo */}
            <div className="flex items-center justify-end">
              <img
  src="/logoo.png"
  alt="Basira Logo"
  draggable={false}
  className={`h-10 sm:h-11 md:h-14 w-auto object-contain transition-all duration-300 ${
    scrolled
      ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
      : "drop-shadow-[0_4px_10px_rgba(0,0,0,0.28)]"
  }`}
/>  
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay blur */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed top-24 right-4 left-4 z-50 md:hidden rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border border-slate-200 p-4 animate-scale-in">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => goToPage(link.href)}
              className={`block w-full text-right px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeSection === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/75 hover:text-primary hover:bg-primary/5"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}