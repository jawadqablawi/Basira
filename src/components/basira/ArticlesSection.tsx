import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { X, ArrowLeft, Clock } from "lucide-react";

const articles = [
  {
    title: "كيف يؤثر الدعم النفسي المبكر على مستقبل الطفل؟",
    excerpt: "تشير الدراسات إلى أن التدخل النفسي المبكر يمكن أن يغير مسار حياة الطفل بالكامل...",
    content: "تشير الدراسات الحديثة إلى أن التدخل النفسي المبكر يمكن أن يغير مسار حياة الطفل بالكامل. عندما يحصل الطفل على الدعم النفسي المناسب في مراحله الأولى، فإنه يطور مهارات التأقلم والمرونة التي تستمر معه طوال حياته.\n\nالأطفال الذين يتلقون دعمًا نفسيًا مبكرًا يظهرون تحسنًا ملحوظًا في الأداء الأكاديمي والعلاقات الاجتماعية والصحة النفسية العامة. كما أنهم أقل عرضة للاكتئاب والقلق في مراحل المراهقة والبلوغ.\n\nفي بَصيرة، نعمل على توفير هذا الدعم من خلال برامج متخصصة تراعي احتياجات كل طفل على حدة.",
    date: "15 مارس 2026",
    readTime: "5 دقائق",
  },
  {
    title: "أهمية اللعب في تطوير شخصية الطفل",
    excerpt: "اللعب ليس مجرد ترفيه، بل هو أداة تعليمية وعلاجية فعّالة تساعد الأطفال على التعبير...",
    content: "اللعب ليس مجرد ترفيه، بل هو أداة تعليمية وعلاجية فعّالة تساعد الأطفال على التعبير عن مشاعرهم وفهم العالم من حولهم. من خلال اللعب، يتعلم الطفل مهارات حل المشكلات والتعاون والتواصل.\n\nالعلاج باللعب هو أحد الأساليب العلاجية الأكثر فعالية مع الأطفال، حيث يتيح لهم التعبير عن مخاوفهم وتجاربهم بطريقة آمنة ومريحة.\n\nنحرص في فعالياتنا على دمج اللعب الهادف مع الأنشطة التعليمية لتحقيق أقصى استفادة ممكنة.",
    date: "10 مارس 2026",
    readTime: "4 دقائق",
  },
  {
    title: "دور الأسرة في تعزيز الصحة النفسية للأطفال",
    excerpt: "الأسرة هي الحصن الأول للطفل، وبيئة المنزل تلعب دورًا محوريًا في تشكيل صحته النفسية...",
    content: "الأسرة هي الحصن الأول للطفل، وبيئة المنزل تلعب دورًا محوريًا في تشكيل صحته النفسية. التواصل المفتوح والحب غير المشروط والدعم المستمر هي أساسيات بيئة أسرية صحية.\n\nمن المهم أن يتعلم الآباء كيفية التعرف على علامات الضغط النفسي لدى أطفالهم والتعامل معها بشكل صحيح. كما أن مشاركة الأطفال في الأنشطة العائلية تعزز الروابط الأسرية والشعور بالأمان.\n\nنقدم في بَصيرة برامج توعوية للأسر لمساعدتهم على بناء بيئة داعمة وصحية لأطفالهم.",
    date: "5 مارس 2026",
    readTime: "6 دقائق",
  },
];

export default function ArticlesSection() {
  const [openArticle, setOpenArticle] = useState<number | null>(null);
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="articles" className="py-24 bg-background">
      <div className="container" ref={ref}>
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            المقالات
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            أحدث <span className="text-primary">مقالاتنا</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((a, i) => (
            <article
              key={i}
              className={`group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 border border-border/50 cursor-pointer ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
              onClick={() => setOpenArticle(i)}
            >
              <div className="h-2 gradient-hero" />
              <div className="p-6">
                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                  <span>{a.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {a.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {a.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{a.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  اقرأ المزيد
                  <ArrowLeft className="h-4 w-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {openArticle !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setOpenArticle(null)}
        >
          <div
            className="bg-card rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 shadow-elevated animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold text-foreground leading-tight pr-4">
                {articles[openArticle].title}
              </h2>
              <button
                onClick={() => setOpenArticle(null)}
                className="p-2 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground text-sm mb-6">
              <span>{articles[openArticle].date}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {articles[openArticle].readTime}
              </span>
            </div>
            <div className="text-foreground/85 leading-loose whitespace-pre-line">
              {articles[openArticle].content}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
