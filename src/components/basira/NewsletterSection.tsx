import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function NewsletterSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const { ref, isVisible } = useScrollReveal();

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "يرجى إدخال الاسم";
    if (!email.trim()) e.email = "يرجى إدخال البريد الإلكتروني";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "بريد إلكتروني غير صالح";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const { error } = await supabase.from("newsletter_subscribers").insert({ name, email });
    if (!error) setSubmitted(true);
  };

  return (
    <section id="newsletter" className="py-24 bg-background">
      <div className="container" ref={ref}>
        <div
          className={`max-w-2xl mx-auto text-center gradient-hero rounded-3xl p-12 shadow-elevated relative overflow-hidden ${
            isVisible ? "animate-scale-in" : "opacity-0"
          }`}
        > <div className="relative z-10">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                  <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-3">ابقَ على تواصل معنا</h2>
                  <p className="text-primary-foreground/80 mb-8">اشترك في نشرتنا البريدية لتصلك آخر أخبارنا وفعالياتنا</p>
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <div className="flex-1 space-y-1">
                      <Input placeholder="الاسم" value={name} onChange={(e) => setName(e.target.value)} className="bg-primary-foreground/15 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 h-12 rounded-xl" />
                      {errors.name && <p className="text-accent text-xs text-right">{errors.name}</p>}
                    </div>
                    <div className="flex-1 space-y-1">
                      <Input type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-primary-foreground/15 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 h-12 rounded-xl" />
                      {errors.email && <p className="text-accent text-xs text-right">{errors.email}</p>}
                    </div>
                    <Button variant="hero" size="lg" type="submit" className="h-12 rounded-xl px-6">
                      <Send className="h-4 w-4" />
                      اشترك
                    </Button>
                  </form>
                </motion.div>
              ) : ( <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 15 }} className="py-6">
                  <CheckCircle2 className="h-16 w-16 text-primary-foreground mx-auto mb-4" />
                  <h3 className="text-2xl font-heading font-bold text-primary-foreground mb-2">شكرًا لاشتراكك! 🎉</h3>
                  <p className="text-primary-foreground/80">ستصلك أحدث أخبارنا وفعالياتنا على بريدك الإلكتروني</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}