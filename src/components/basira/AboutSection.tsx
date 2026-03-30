import { useState } from "react";
import { Eye, Target, Gem, X } from "lucide-react";

const items = [
  {
    id: 1,
    title: "رؤيتنا",
    icon: Eye,
    shortText:
      "مجتمع يقدّر صحة الطفل النفسية ويمكنه من تحقيق إمكاناته الكاملة في بيئة آمنة وداعمة.",
    fullText:
      "نطمح إلى بناء مجتمع يضع صحة الطفل النفسية والتعليمية في مقدمة أولوياته، ويمنحه الفرصة الكاملة للنمو والتعبير عن ذاته واكتشاف قدراته ضمن بيئة آمنة وداعمة وملهمة تصنع أثرًا مستدامًا في حياته.",
  },
  {
    id: 2,
    title: "رسالتنا",
    icon: Target,
    shortText:
      "تقديم الدعم النفسي والتعليمي للأطفال من خلال برامج وأنشطة مبتكرة تبني الثقة وتعزز المرونة.",
    fullText:
      "نعمل على تقديم برامج وأنشطة نفسية وتعليمية وترفيهية هادفة للأطفال، تساهم في بناء الثقة بالنفس، وتعزيز المرونة، وتنمية المهارات، وفتح أبواب جديدة للأمل والتطور من خلال محتوى وتجارب مؤثرة.",
  },
  {
    id: 3,
    title: "قيمنا",
    icon: Gem,
    shortText:
      "التعاطف، الاحترام، الشفافية، والتأثير المستدام. نؤمن بأن التغيير يبدأ من القلب.",
    fullText:
      "نؤمن بأن التعاطف هو أساس العمل الإنساني، وأن الاحترام والشفافية والالتزام تصنع فرقًا حقيقيًا. كما نؤمن بأن الأثر المستدام يبدأ من النية الصادقة والعمل المتقن، وأن كل مبادرة صغيرة قادرة على إحداث تغيير كبير.",
  },
];

export default function AboutSection() {
  const [selectedItem, setSelectedItem] = useState<(typeof items)[0] | null>(null);

  return (
    <section className="py-24 bg-[#f5f7fb]" dir="rtl">
      <div className="container mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-5">
            من نحن
          </span>

          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-5">
            نبني جسورًا من <span className="text-blue-600">الأمل</span>
          </h2>

          <p className="text-slate-500 text-lg md:text-2xl leading-9">
            بصيرة مبادرة شبابية تسعى لإحداث أثر حقيقي في حياة الأطفال من خلال الدعم النفسي والتعليمي والترفيهي.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group text-right bg-white rounded-[28px] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-8 min-h-[280px] flex flex-col justify-between"
              >
                <div className="flex justify-end mb-8">
                  <div className="w-18 h-18">
                    <div className="w-[72px] h-[72px] rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-4">
                    {item.title}
                  </h3>

                  <p className="text-slate-500 text-lg leading-9">
                    {item.shortText}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Popup */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[999] bg-black/55 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl p-8 md:p-10 text-right animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 left-5 w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>

            <div className="flex justify-end mb-6">
              <div className="w-[82px] h-[82px] rounded-[24px] bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg">
                <selectedItem.icon className="w-9 h-9 text-white" />
              </div>
            </div>

            <h3 className="text-4xl font-extrabold text-slate-900 mb-5">
              {selectedItem.title}
            </h3>

            <p className="text-slate-600 text-lg md:text-xl leading-10">
              {selectedItem.fullText}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}