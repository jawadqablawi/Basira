import { Instagram, Facebook, Mail, Phone } from "lucide-react";

const teamMembers = [
  {
    name: "Jawad Qablawi",
    role: "Computer Engineering Student",
    image: "/team/jawad.jpg",
    bio: "يساهم في تنظيم أعمال المبادرة ومتابعة الأنشطة والتنسيق بين أعضاء الفريق.",
    socials: {
      instagram: "https://www.instagram.com/jawad.qablawi?igsh=MXhldGZtaWx1cXo5aA==",
    },
  },
  
  {
    name: "Areen Hamdan",
    role: "Media Technology Student",
    image: "/team/areen.jpeg",
   bio: "تعمل على توثيق أنشطة المبادرة وإدارة المحتوى الإعلامي، من خلال التصوير والتصميم وصناعة محتوى هادف يعكس رسالة المبادرة ويصل إلى المجتمع بشكل مؤثر.",
    socials: {
      instagram: "https://www.instagram.com/areen__48?igsh=MWZ1cWNkYmhtdGhzOQ==",
    },
  },
  
  {
    name: "Halla  shumali",
    role: "Bachelor of English Language",
    image: "/team/halla.jpeg",
   bio: "تساهم في تطوير المحتوى باللغة الإنجليزية وصياغته بأسلوب احترافي، بما يعزز حضور المبادرة ويضمن وصول رسالتها إلى نطاق أوسع محليًا ودوليًا.",
    socials: {
      instagram: "https://www.instagram.com/halla.s.s?igsh=MTBwaTkyb3c4aWUxaw==",
   
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
           <div className="flex justify-center space-x-3">
  <a
    href={member.socials.instagram}
    target="_blank"
    rel="noopener noreferrer"
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