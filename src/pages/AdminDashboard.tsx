import { useEffect, useMemo, useState } from "react";
import {
  Users,
  CalendarDays,
  Handshake,
  Mail,
  Activity,
  Plus,
  Pencil,
  Trash2,
  LayoutDashboard,
  Search,
} from "lucide-react";

type Member = {
  id: string;
  name: string;
  role: string;
  image: string;
};

type ActivityItem = {
  id: string;
  title: string;
  description: string;
  date: string;
};

type EventItem = {
  id: string;
  title: string;
  location: string;
  date: string;
};

type Partner = {
  id: string;
  name: string;
  logo: string;
  website: string;
};

type NewsletterSubscriber = {
  id: string;
  email: string;
  date: string;
};

type SectionKey =
  | "dashboard"
  | "members"
  | "activities"
  | "events"
  | "partners"
  | "newsletter";

const STORAGE_KEYS = {
  members: "basira_admin_members",
  activities: "basira_admin_activities",
  events: "basira_admin_events",
  partners: "basira_admin_partners",
  newsletter: "basira_admin_newsletter",
};

const defaultMembers: Member[] = [
  {
    id: crypto.randomUUID(),
    name: "أحمد محمد",
    role: "منسق الفريق",
    image: "https://via.placeholder.com/120x120?text=Member",
  },
  {
    id: crypto.randomUUID(),
    name: "سارة علي",
    role: "مسؤولة الأنشطة",
    image: "https://via.placeholder.com/120x120?text=Member",
  },
];

const defaultActivities: ActivityItem[] = [
  {
    id: crypto.randomUUID(),
    title: "جلسة دعم نفسي",
    description: "جلسة جماعية للأطفال لتعزيز التعبير والثقة",
    date: "2026-03-28",
  },
  {
    id: crypto.randomUUID(),
    title: "نشاط تعليمي تفاعلي",
    description: "أنشطة تعليمية ممتعة داخل المبادرة",
    date: "2026-03-29",
  },
];

const defaultEvents: EventItem[] = [
  {
    id: crypto.randomUUID(),
    title: "يوم بصيرة المفتوح",
    location: "جامعة خضوري",
    date: "2026-04-10",
  },
];

const defaultPartners: Partner[] = [
  {
    id: crypto.randomUUID(),
    name: "PSSF",
    logo: "https://via.placeholder.com/140x80?text=PSSF",
    website: "https://example.com",
  },
];

const defaultNewsletter: NewsletterSubscriber[] = [
  {
    id: crypto.randomUUID(),
    email: "example1@mail.com",
    date: "2026-03-28",
  },
  {
    id: crypto.randomUUID(),
    email: "example2@mail.com",
    date: "2026-03-27",
  },
];

function loadData<T>(key: string, fallback: T): T {
  const saved = localStorage.getItem(key);
  if (!saved) return fallback;
  try {
    return JSON.parse(saved) as T;
  } catch {
    return fallback;
  }
}

function saveData<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-800">{value}</h3>
        </div>
        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">{icon}</div>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
      {text}
    </div>
  );
}

export default function AdminDashboard() {
  const [section, setSection] = useState<SectionKey>("dashboard");

  const [members, setMembers] = useState<Member[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [newsletter, setNewsletter] = useState<NewsletterSubscriber[]>([]);

  const [search, setSearch] = useState("");

  const [memberForm, setMemberForm] = useState<Member>({
    id: "",
    name: "",
    role: "",
    image: "",
  });

  const [activityForm, setActivityForm] = useState<ActivityItem>({
    id: "",
    title: "",
    description: "",
    date: "",
  });

  const [eventForm, setEventForm] = useState<EventItem>({
    id: "",
    title: "",
    location: "",
    date: "",
  });

  const [partnerForm, setPartnerForm] = useState<Partner>({
    id: "",
    name: "",
    logo: "",
    website: "",
  });

  useEffect(() => {
    setMembers(loadData(STORAGE_KEYS.members, defaultMembers));
    setActivities(loadData(STORAGE_KEYS.activities, defaultActivities));
    setEvents(loadData(STORAGE_KEYS.events, defaultEvents));
    setPartners(loadData(STORAGE_KEYS.partners, defaultPartners));
    setNewsletter(loadData(STORAGE_KEYS.newsletter, defaultNewsletter));
  }, []);

  useEffect(() => saveData(STORAGE_KEYS.members, members), [members]);
  useEffect(() => saveData(STORAGE_KEYS.activities, activities), [activities]);
  useEffect(() => saveData(STORAGE_KEYS.events, events), [events]);
  useEffect(() => saveData(STORAGE_KEYS.partners, partners), [partners]);
  useEffect(() => saveData(STORAGE_KEYS.newsletter, newsletter), [newsletter]);

  const filteredMembers = useMemo(() => {
    return members.filter(
      (item) =>
        item.name.includes(search) ||
        item.role.includes(search)
    );
  }, [members, search]);

  const filteredActivities = useMemo(() => {
    return activities.filter(
      (item) =>
        item.title.includes(search) ||
        item.description.includes(search)
    );
  }, [activities, search]);

  const filteredEvents = useMemo(() => {
    return events.filter(
      (item) =>
        item.title.includes(search) ||
        item.location.includes(search)
    );
  }, [events, search]);

  const filteredPartners = useMemo(() => {
    return partners.filter(
      (item) =>
        item.name.includes(search) ||
        item.website.includes(search)
    );
  }, [partners, search]);

  const filteredNewsletter = useMemo(() => {
    return newsletter.filter((item) => item.email.includes(search));
  }, [newsletter, search]);

  const resetMemberForm = () =>
    setMemberForm({ id: "", name: "", role: "", image: "" });

  const resetActivityForm = () =>
    setActivityForm({ id: "", title: "", description: "", date: "" });

  const resetEventForm = () =>
    setEventForm({ id: "", title: "", location: "", date: "" });

  const resetPartnerForm = () =>
    setPartnerForm({ id: "", name: "", logo: "", website: "" });

  const handleSaveMember = () => {
    if (!memberForm.name || !memberForm.role) return;

    if (memberForm.id) {
      setMembers((prev) =>
        prev.map((item) => (item.id === memberForm.id ? memberForm : item))
      );
    } else {
      setMembers((prev) => [
        { ...memberForm, id: crypto.randomUUID() },
        ...prev,
      ]);
    }
    resetMemberForm();
  };

  const handleSaveActivity = () => {
    if (!activityForm.title || !activityForm.description || !activityForm.date) return;

    if (activityForm.id) {
      setActivities((prev) =>
        prev.map((item) => (item.id === activityForm.id ? activityForm : item))
      );
    } else {
      setActivities((prev) => [
        { ...activityForm, id: crypto.randomUUID() },
        ...prev,
      ]);
    }
    resetActivityForm();
  };

  const handleSaveEvent = () => {
    if (!eventForm.title || !eventForm.location || !eventForm.date) return;

    if (eventForm.id) {
      setEvents((prev) =>
        prev.map((item) => (item.id === eventForm.id ? eventForm : item))
      );
    } else {
      setEvents((prev) => [{ ...eventForm, id: crypto.randomUUID() }, ...prev]);
    }
    resetEventForm();
  };

  const handleSavePartner = () => {
    if (!partnerForm.name) return;

    if (partnerForm.id) {
      setPartners((prev) =>
        prev.map((item) => (item.id === partnerForm.id ? partnerForm : item))
      );
    } else {
      setPartners((prev) => [
        { ...partnerForm, id: crypto.randomUUID() },
        ...prev,
      ]);
    }
    resetPartnerForm();
  };

  const menuItems = [
    { key: "dashboard", label: "الرئيسية", icon: <LayoutDashboard size={18} /> },
    { key: "members", label: "الأعضاء", icon: <Users size={18} /> },
    { key: "activities", label: "الأنشطة", icon: <Activity size={18} /> },
    { key: "events", label: "الفعاليات", icon: <CalendarDays size={18} /> },
    { key: "partners", label: "الشركاء", icon: <Handshake size={18} /> },
    { key: "newsletter", label: "البريد", icon: <Mail size={18} /> },
  ] as const;

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="bg-slate-900 text-white p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">لوحة تحكم بَصيرة</h1>
            <p className="mt-2 text-sm text-slate-300">
              إدارة الموقع والمحتوى من مكان واحد
            </p>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setSection(item.key);
                  setSearch("");
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
                  section === item.key
                    ? "bg-blue-600 text-white"
                    : "text-slate-200 hover:bg-slate-800"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="p-6 md:p-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Admin Dashboard</h2>
              <p className="mt-1 text-slate-500">إدارة سريعة ومرتبة لمحتوى الموقع</p>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="ابحث..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pr-10 pl-4 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {section === "dashboard" && (
            <>
              <SectionHeader
                title="نظرة عامة"
                subtitle="إحصائيات سريعة عن محتوى الموقع"
              />

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                <StatCard title="الأعضاء" value={members.length} icon={<Users />} />
                <StatCard title="الأنشطة" value={activities.length} icon={<Activity />} />
                <StatCard title="الفعاليات" value={events.length} icon={<CalendarDays />} />
                <StatCard title="الشركاء" value={partners.length} icon={<Handshake />} />
                <StatCard title="مشتركو البريد" value={newsletter.length} icon={<Mail />} />
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                  <h3 className="mb-4 text-lg font-bold text-slate-800">آخر الأعضاء</h3>
                  <div className="space-y-3">
                    {members.slice(0, 4).map((item) => (
                      <div key={item.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                        <div>
                          <p className="font-semibold text-slate-800">{item.name}</p>
                          <p className="text-sm text-slate-500">{item.role}</p>
                        </div>
                        <img
                          src={item.image || "https://via.placeholder.com/60x60?text=Member"}
                          alt={item.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                  <h3 className="mb-4 text-lg font-bold text-slate-800">آخر مشتركي البريد</h3>
                  <div className="space-y-3">
                    {newsletter.slice(0, 5).map((item) => (
                      <div key={item.id} className="rounded-xl bg-slate-50 p-3">
                        <p className="font-medium text-slate-800">{item.email}</p>
                        <p className="text-sm text-slate-500">{item.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {section === "members" && (
            <>
              <SectionHeader
                title="إدارة الأعضاء"
                subtitle="إضافة وتعديل وحذف أعضاء الفريق"
                action={
                  <button
                    onClick={resetMemberForm}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
                  >
                    <Plus size={18} />
                    عضو جديد
                  </button>
                }
              />

              <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                <div className="grid gap-4 md:grid-cols-3">
                  <input
                    type="text"
                    placeholder="اسم العضو"
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="الدور / المنصب"
                    value={memberForm.role}
                    onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="رابط الصورة"
                    value={memberForm.image}
                    onChange={(e) => setMemberForm({ ...memberForm, image: e.target.value })}
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={handleSaveMember}
                    className="rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
                  >
                    {memberForm.id ? "حفظ التعديل" : "إضافة عضو"}
                  </button>
                  <button
                    onClick={resetMemberForm}
                    className="rounded-xl bg-slate-200 px-5 py-3 text-slate-700 hover:bg-slate-300"
                  >
                    تفريغ
                  </button>
                </div>
              </div>

              {filteredMembers.length === 0 ? (
                <EmptyState text="لا يوجد أعضاء مطابقون." />
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredMembers.map((item) => (
                    <div key={item.id} className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                      <div className="mb-4 flex items-center gap-4">
                        <img
                          src={item.image || "https://via.placeholder.com/100x100?text=Member"}
                          alt={item.name}
                          className="h-20 w-20 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
                          <p className="text-slate-500">{item.role}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setMemberForm(item)}
                          className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
                        >
                          <Pencil size={16} />
                          تعديل
                        </button>
                        <button
                          onClick={() => setMembers((prev) => prev.filter((m) => m.id !== item.id))}
                          className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        >
                          <Trash2 size={16} />
                          حذف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {section === "activities" && (
            <>
              <SectionHeader
                title="إدارة الأنشطة"
                subtitle="أضف الأنشطة وعدّلها بسهولة"
              />

              <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                <div className="grid gap-4 md:grid-cols-3">
                  <input
                    type="text"
                    placeholder="عنوان النشاط"
                    value={activityForm.title}
                    onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                  <input
                    type="date"
                    value={activityForm.date}
                    onChange={(e) => setActivityForm({ ...activityForm, date: e.target.value })}
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="وصف النشاط"
                    value={activityForm.description}
                    onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={handleSaveActivity}
                    className="rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
                  >
                    {activityForm.id ? "حفظ التعديل" : "إضافة نشاط"}
                  </button>
                  <button
                    onClick={resetActivityForm}
                    className="rounded-xl bg-slate-200 px-5 py-3 text-slate-700 hover:bg-slate-300"
                  >
                    تفريغ
                  </button>
                </div>
              </div>

              {filteredActivities.length === 0 ? (
                <EmptyState text="لا يوجد أنشطة مطابقة." />
              ) : (
                <div className="grid gap-4">
                  {filteredActivities.map((item) => (
                    <div key={item.id} className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                          <p className="mt-1 text-slate-500">{item.description}</p>
                          <p className="mt-2 text-sm text-blue-600">{item.date}</p>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => setActivityForm(item)}
                            className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
                          >
                            <Pencil size={16} />
                            تعديل
                          </button>
                          <button
                            onClick={() =>
                              setActivities((prev) => prev.filter((a) => a.id !== item.id))
                            }
                            className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                          >
                            <Trash2 size={16} />
                            حذف
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {section === "events" && (
            <>
              <SectionHeader
                title="إدارة الفعاليات"
                subtitle="إضافة وتعديل الفعاليات"
              />

              <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                <div className="grid gap-4 md:grid-cols-3">
                  <input
                    type="text"
                    placeholder="عنوان الفعالية"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="المكان"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={handleSaveEvent}
                    className="rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
                  >
                    {eventForm.id ? "حفظ التعديل" : "إضافة فعالية"}
                  </button>
                  <button
                    onClick={resetEventForm}
                    className="rounded-xl bg-slate-200 px-5 py-3 text-slate-700 hover:bg-slate-300"
                  >
                    تفريغ
                  </button>
                </div>
              </div>

              {filteredEvents.length === 0 ? (
                <EmptyState text="لا يوجد فعاليات مطابقة." />
              ) : (
                <div className="grid gap-4">
                  {filteredEvents.map((item) => (
                    <div key={item.id} className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                          <p className="mt-1 text-slate-500">{item.location}</p>
                          <p className="mt-2 text-sm text-blue-600">{item.date}</p>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => setEventForm(item)}
                            className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
                          >
                            <Pencil size={16} />
                            تعديل
                          </button>
                          <button
                            onClick={() => setEvents((prev) => prev.filter((e) => e.id !== item.id))}
                            className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                          >
                            <Trash2 size={16} />
                            حذف
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {section === "partners" && (
            <>
              <SectionHeader
                title="إدارة الشركاء"
                subtitle="إضافة وتعديل الشركاء"
              />

              <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                <div className="grid gap-4 md:grid-cols-3">
                  <input
                    type="text"
                    placeholder="اسم الشريك"
                    value={partnerForm.name}
                    onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="رابط الشعار"
                    value={partnerForm.logo}
                    onChange={(e) => setPartnerForm({ ...partnerForm, logo: e.target.value })}
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="الموقع الإلكتروني"
                    value={partnerForm.website}
                    onChange={(e) => setPartnerForm({ ...partnerForm, website: e.target.value })}
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={handleSavePartner}
                    className="rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
                  >
                    {partnerForm.id ? "حفظ التعديل" : "إضافة شريك"}
                  </button>
                  <button
                    onClick={resetPartnerForm}
                    className="rounded-xl bg-slate-200 px-5 py-3 text-slate-700 hover:bg-slate-300"
                  >
                    تفريغ
                  </button>
                </div>
              </div>

              {filteredPartners.length === 0 ? (
                <EmptyState text="لا يوجد شركاء مطابقون." />
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredPartners.map((item) => (
                    <div key={item.id} className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                      <img
                        src={item.logo || "https://via.placeholder.com/140x80?text=Partner"}
                        alt={item.name}
                        className="mb-4 h-20 w-full rounded-xl object-contain bg-slate-50 p-3"
                      />
                      <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
                      <p className="mt-2 text-sm text-slate-500 break-all">{item.website}</p>

                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => setPartnerForm(item)}
                          className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
                        >
                          <Pencil size={16} />
                          تعديل
                        </button>
                        <button
                          onClick={() =>
                            setPartners((prev) => prev.filter((p) => p.id !== item.id))
                          }
                          className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        >
                          <Trash2 size={16} />
                          حذف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {section === "newsletter" && (
            <>
              <SectionHeader
                title="مشتركو البريد"
                subtitle="عرض جميع المشتركين في النشرة البريدية"
              />

              {filteredNewsletter.length === 0 ? (
                <EmptyState text="لا يوجد مشتركين مطابقين." />
              ) : (
                <div className="rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden">
                  <table className="w-full text-right">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-4 text-sm font-bold text-slate-700">البريد الإلكتروني</th>
                        <th className="px-4 py-4 text-sm font-bold text-slate-700">تاريخ الاشتراك</th>
                        <th className="px-4 py-4 text-sm font-bold text-slate-700">إجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredNewsletter.map((item) => (
                        <tr key={item.id} className="border-t border-slate-100">
                          <td className="px-4 py-4 text-slate-700">{item.email}</td>
                          <td className="px-4 py-4 text-slate-500">{item.date}</td>
                          <td className="px-4 py-4">
                            <button
                              onClick={() =>
                                setNewsletter((prev) => prev.filter((n) => n.id !== item.id))
                              }
                              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                            >
                              <Trash2 size={16} />
                              حذف
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}