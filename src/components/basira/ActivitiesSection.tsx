import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Brain, Gamepad2, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Category = "all" | "education" | "psychological" | "entertainment";

type ActivityItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: Exclude<Category, "all">;
};

const filters: { key: Category; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "education", label: "تعليمي" },
  { key: "psychological", label: "نفسي" },
  { key: "entertainment", label: "ترفيهي" },
];

const iconMap = {
  education: BookOpen,
  psychological: Brain,
  entertainment: Gamepad2,
};

export default function ActivitiesSection() {
  const [filter, setFilter] = useState<Category>("all");
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    supabase.from("activities").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setActivities((data || []) as ActivityItem[]);
    });
  }, []);

  const filtered = filter === "all" ? activities : activities.filter((a) => a.category === filter);

  return (
    <section id="activities" className="py-24 bg-muted/30">
      <div className="container" ref={ref}>
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">الفعاليات</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">أنشطتنا و<span className="text-primary">فعالياتنا</span></h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${filter === f.key ? "gradient-hero text-primary-foreground shadow-soft" : "bg-card text-foreground/70 hover:bg-primary/5 border border-border/50"}`}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a, i) => {
            const Icon = iconMap[a.category];
            return (
              <div key={a.id} className={`group bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 border border-border/50 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl gradient-hero flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4" />
                    {a.date}
                  </div>
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">{a.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{a.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}