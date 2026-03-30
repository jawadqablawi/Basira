import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { supabase } from "@/lib/supabase";

type Partner = {
  id: string;
  name: string;
  logo_url: string | null;
  website: string | null;
};

export default function PartnersSection() {
  const { ref, isVisible } = useScrollReveal();
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    supabase.from("partners").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setPartners(data || []);
    });
  }, []);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container" ref={ref}>
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">شركاؤنا</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">شركاء <span className="text-primary">النجاح</span></h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-4xl mx-auto">
          {partners.map((p, i) => (
            <a key={p.id} href={p.website || "#"} target="_blank" rel="noreferrer" className={`bg-card rounded-2xl p-6 flex items-center justify-center shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 border border-border/50 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${i * 0.08}s` }}>
              {p.logo_url ? (
                <img src={p.logo_url} alt={p.name} className="max-h-12 w-full object-contain" />
              ) : (
                <span className="text-sm font-heading font-bold text-muted-foreground text-center">{p.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}