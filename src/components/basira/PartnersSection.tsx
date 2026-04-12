import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const partners = [
  {
    id: "1",
    name: "جامعة فلسطين التقنية - خضوري",
    logo_url: "/partners/ptuk.png",
    website: "https://www.ptuk.edu.ps",
  },
  {
    id: "2",
    name: "The Palestine Students Scholarship Fund",
    logo_url: "/partners/pssf.png",
    website: "https://www.thepssf.com/",
  },
  {
    id: "3",
    name: " اللجنة الشعبية لخدمات مخيم طولكرم",
     logo_url: "/partners/tulkarem.jpg",
    website: "https://www.facebook.com/tulkaremcamp/?locale=ar_AR#",
  },
  {
    id: "4",
    name: " اللجنة الشعبية لخدمات مخيم نور شمس",
    logo_url: "/partners/tulkarem1.jpg",

  },
   {
    id: "5",
    name: "الهلال الاحمر الفلسطيني - فرع طولكرم",
    logo_url: "/partners/prcs.webp",
    website: "https://palestinercs.org/ar/",
  },
       {
    id: "6",
    name:"نادي شويكة الرياضي الثقافي",
    logo_url: "/partners/show.jpg",
    website: "https://www.facebook.com/shwekahclub.56",
  },
];

export default function PartnersSection() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <span className="inline-block px-5 py-2 rounded-full border bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
            شركاؤنا
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            شركاء <span className="text-blue-600">النجاح</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto leading-8">
            نفخر بشراكاتنا مع جهات داعمة ومؤسسات فاعلة ساهمت في تعزيز أثر مبادرة بصيرة ودعم رسالتها المجتمعية.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-3 hover:bg-gray-100 transition"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-12 scrollbar-hide"
          >
            {partners.map((partner) => (
              <a
                key={partner.id}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[260px] h-[170px] snap-center bg-white rounded-[30px] shadow-sm border border-gray-100 flex items-center justify-center hover:shadow-md transition"
              >
              <div className="flex flex-col items-center justify-center gap-3">

  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md group-hover:scale-105 transition">
    <img
      src={partner.logo_url}
      alt={partner.name}
      className="w-20 h-20 object-cover rounded-full"
    />
  </div>

  <p className="text-sm font-semibold text-gray-700 text-center leading-5">
    {partner.name}
  </p>

</div>
              </a>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-3 hover:bg-gray-100 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}