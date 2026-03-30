import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useState } from "react";

const stats = [
  { value: 300, suffix: "+", label: "طفل مستفيد" },
  { value: 20, suffix: "+", label: "فعالية منظّمة" },
  { value: 80, suffix: "+", label: "متطوع نشط" },
  { value: 10, suffix: "+", label: "شريك استراتيجي" },
];

function AnimatedCounter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span className="text-4xl md:text-5xl font-heading font-extrabold text-primary-foreground">
      {count.toLocaleString("ar-EG")}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const { ref, isVisible } = useScrollReveal(0.3);

  return (
    <section className="py-20 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-1/4 w-48 h-48 rounded-full bg-primary-foreground/30 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-64 h-64 rounded-full bg-accent/40 blur-3xl" />
      </div>
      <div className="container relative z-10" ref={ref}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground">
            أرقام تتحدث عن أثرنا
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <AnimatedCounter target={s.value} suffix={s.suffix} active={isVisible} />
              <p className="text-primary-foreground/80 mt-2 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
