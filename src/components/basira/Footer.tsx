import { useState } from "react";
import { Mail, Phone, Instagram, Facebook, Send, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quickLinks = [
  { label: "من نحن", href: "/about" },
  { label: "الفعاليات", href: "/activities" },
  { label: "المقالات", href: "/articles" },
  { label: "فريقنا", href: "/team" },
  { label: "تواصل معنا", href: "/contact" },
];

export default function Footer() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      alert("الرجاء إدخال بريد إلكتروني صالح");
      return;
    }

    try {
      setLoading(true);

      console.log("New subscriber:", email);

      alert("تم الاشتراك بنجاح 🔥");
      setEmail("");
    } catch (err) {
      alert("صار خطأ، جرّب مرة ثانية");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(135deg,#03142b_0%,#07224a_50%,#021227_100%)] text-white">
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.25),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.18),transparent_25%)]" />
      <div className="absolute -top-32 right-[-120px] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 left-[-120px] w-[300px] h-[300px] bg-orange-400/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-6 md:px-10 pt-20 pb-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 xl:gap-10">
          
          {/* Brand */}
          <div className="xl:col-span-1 flex flex-col text-right">
            <img
              src="/logo.svg"
              alt="Basira Logo"
              className="block w-48 h-auto ml-auto mb-6 drop-shadow-[0_8px_22px_rgba(0,0,0,0.35)] hover:scale-[1.03] transition duration-300"
            />

            <p className="text-white/80 leading-9 text-base max-w-[360px] ml-auto">
              مبادرة شبابية تهدف إلى تقديم الدعم النفسي والتعليمي وتمكين الأطفال
              من خلال أنشطة مؤثرة ومستدامة، ضمن بيئة آمنة وملهمة تصنع أثرًا حقيقيًا.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-right">
            <h3 className="text-3xl font-extrabold mb-6">
              روابط سريعة
              <span className="block w-20 h-1.5 bg-gradient-to-l from-orange-400 via-amber-300 to-blue-500 rounded-full mt-3"></span>
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => navigate(link.href)}
                    className="text-white/70 hover:text-white hover:translate-x-[-5px] transition-all duration-300 text-base"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-right">
            <h3 className="text-3xl font-extrabold mb-6">
              تواصل معنا
              <span className="block w-20 h-1.5 bg-gradient-to-l from-orange-400 via-amber-300 to-blue-500 rounded-full mt-3"></span>
            </h3>

            <div className="space-y-5">
              <a
                href="mailto:basira.ptuk@gmail.com"
                className="flex items-center justify-end gap-3 text-white/75 hover:text-white transition"
              >
                <span>basira.ptuk@gmail.com</span>
                <Mail className="w-5 h-5 text-orange-400" />
              </a>

              <a
                href="tel:+972598999952"
                className="flex items-center justify-end gap-3 text-white/75 hover:text-white transition"
              >
                <span>+972 598 999 952</span>
                <Phone className="w-5 h-5 text-orange-400" />
              </a>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <a
                href="#"
                className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-orange-400 hover:to-blue-500 hover:scale-110 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-orange-400 hover:to-blue-500 hover:scale-110 transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="text-right">
            <h3 className="text-3xl font-extrabold mb-6">
              اشترك معنا
              <span className="block w-20 h-1.5 bg-gradient-to-l from-orange-400 via-amber-300 to-blue-500 rounded-full mt-3"></span>
            </h3>

            <p className="text-white/70 mb-5 leading-7">
              اشترك ليصلك جديد المبادرة والأنشطة والمقالات أولًا بأول.
            </p>

            <div className="bg-white/[0.06] border border-white/10 rounded-[28px] p-4 backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.35)]">
              <div className="flex flex-col gap-3">
                
                <input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 rounded-2xl bg-white/90 text-slate-900 px-5 outline-none"
                />

                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="h-14 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-orange-400 hover:scale-[1.03] active:scale-95 transition-all duration-300 font-extrabold flex items-center justify-center gap-2 shadow-[0_12px_30px_rgba(59,130,246,0.35)] disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  {loading ? "جاري الاشتراك..." : "اشتراك الآن"}
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 mb-8 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <p>© 2026 جميع الحقوق محفوظة لمبادرة بَصيرة</p>

          <p className="flex items-center gap-2">
            صُنع بحب
            <Heart className="w-4 h-4 text-orange-400 fill-orange-400" />
            بواسطة فريق بَصيرة
          </p>
        </div>
      </div>
    </footer>
  );
}