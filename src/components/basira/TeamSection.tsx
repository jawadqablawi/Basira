import { Instagram, Facebook, Mail, Phone } from "lucide-react";

const teamMembers = [
  {
    name: "Jawad Qablawi",
    role: "Team Leader",
    image: "/team/jawad.jpg",
    bio: "يساهم في تنظيم أعمال المبادرة ومتابعة الأنشطة والتنسيق بين أعضاء الفريق.",
    socials: {
      instagram: "#",
      facebook: "#",
      email: "mailto:example@gmail.com",
      phone: "tel:+970599999999",
    },
  },
  {
    name: "مريم خالد",
    role: "مسؤولة الدعم النفسي",
    image: "/team/mariam.jpg",
    bio: "تعمل على تصميم الأنشطة الداعمة للأطفال والمساهمة في بناء بيئة آمنة وملهمة.",
    socials: {
      instagram: "#",
      facebook: "#",
      email: "mailto:example@gmail.com",
      phone: "tel:+970599999999",
    },
  },
  {
    name: "لينا يوسف",
    role: "مسؤولة المحتوى والإعلام",
    image: "/team/lina.jpg",
    bio: "تتابع المحتوى الإعلامي للمبادرة وتوثيق الأنشطة وإبراز أثر الفريق.",
    socials: {
      instagram: "#",
      facebook: "#",
      email: "mailto:example@gmail.com",
      phone: "tel:+970599999999",
    },
  },
];

export default function TeamSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#071c3b] to-[#0b2a56] text-white">
      <div className="container mx-auto px-6 md:px-10">
        
        {/* العنوان */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            قلوب خلف المبادرة
          </h2>
          <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base leading-7">
            فريق يعمل بشغف لصناعة أثر حقيقي، ويؤمن بأن كل طفل يستحق فرصة للنمو والدعم.
          </p>
        </div>

        {/* الكروت */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md p-6 text-center hover:translate-y-[-5px] transition duration-300"
            >
              
              {/* الصورة */}
              <div className="flex justify-center mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-lg"
                />
              </div>

              {/* الاسم */}
              <h3 className="text-lg font-bold mb-1">{member.name}</h3>

              {/* الدور */}
              <p className="text-orange-300 text-sm mb-3">{member.role}</p>

              {/* الوصف */}
              <p className="text-white/70 text-sm leading-6 mb-4 px-2">
                {member.bio}
              </p>

              {/* السوشيال */}
              <div className="flex justify-center gap-3">
                
                <a
                  href={member.socials.phone}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-green-500/70 transition"
                >
                  <Phone size={16} />
                </a>

                <a
                  href={member.socials.email}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-orange-500/70 transition"
                >
                  <Mail size={16} />
                </a>

                <a
                  href={member.socials.facebook}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-blue-500/70 transition"
                >
                  <Facebook size={16} />
                </a>

                <a
                  href={member.socials.instagram}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-pink-500/70 transition"
                >
                  <Instagram size={16} />
                </a>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}