import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { uploadImage } from "@/lib/uploadImage";

type Member = { id: string; name: string; role: string; image_url: string | null };
type Activity = { id: string; title: string; description: string; date: string; category: string };
type EventItem = { id: string; title: string; location: string; date: string };
type Partner = { id: string; name: string; logo_url: string | null; website: string | null };
type Subscriber = { id: string; name: string; email: string; created_at: string };

type Tab = "members" | "activities" | "events" | "partners" | "newsletter";

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("members");

  const [members, setMembers] = useState<Member[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState("");
  const [memberImage, setMemberImage] = useState<File | null>(null);

  const [activityTitle, setActivityTitle] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [activityDate, setActivityDate] = useState("");
  const [activityCategory, setActivityCategory] = useState("education");

  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [partnerName, setPartnerName] = useState("");
  const [partnerWebsite, setPartnerWebsite] = useState("");
  const [partnerLogo, setPartnerLogo] = useState<File | null>(null);

  async function loadAll() {
    const [m, a, e, p, n] = await Promise.all([
      supabase.from("members").select("*").order("created_at", { ascending: false }),
      supabase.from("activities").select("*").order("created_at", { ascending: false }),
      supabase.from("events").select("*").order("created_at", { ascending: false }),
      supabase.from("partners").select("*").order("created_at", { ascending: false }),
      supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }),
    ]);

    setMembers(m.data || []);
    setActivities(a.data || []);
    setEvents(e.data || []);
    setPartners(p.data || []);
    setSubscribers(n.data || []);
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function addMember() {
    let image_url: string | null = null;
    if (memberImage) image_url = await uploadImage(memberImage, "members");

    await supabase.from("members").insert({
      name: memberName,
      role: memberRole,
      image_url,
    });

    setMemberName("");
    setMemberRole("");
    setMemberImage(null);
    loadAll();
  }

  async function addActivity() {
    await supabase.from("activities").insert({
      title: activityTitle,
      description: activityDescription,
      date: activityDate,
      category: activityCategory,
    });

    setActivityTitle("");
    setActivityDescription("");
    setActivityDate("");
    setActivityCategory("education");
    loadAll();
  }

  async function addEvent() {
    await supabase.from("events").insert({
      title: eventTitle,
      location: eventLocation,
      date: eventDate,
    });

    setEventTitle("");
    setEventLocation("");
    setEventDate("");
    loadAll();
  }

  async function addPartner() {
    let logo_url: string | null = null;
    if (partnerLogo) logo_url = await uploadImage(partnerLogo, "partners");

    await supabase.from("partners").insert({
      name: partnerName,
      website: partnerWebsite,
      logo_url,
    });

    setPartnerName("");
    setPartnerWebsite("");
    setPartnerLogo(null);
    loadAll();
  }

  async function deleteRow(table: string, id: string) {
    await supabase.from(table).delete().eq("id", id);
    loadAll();
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">لوحة تحكم بَصيرة</h1>
          <p className="text-slate-500 mt-1">إدارة الأعضاء والأنشطة والفعاليات والشركاء والبريد</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("basira_admin_logged_in");
            window.location.href = "/admin";
          }}
          className="rounded-xl bg-red-600 px-4 py-2 text-white"
        >
          تسجيل خروج
        </button>
      </div>


      <div className="mb-6 flex flex-wrap gap-3">
        {[
          ["members", "الأعضاء"],
          ["activities", "الأنشطة"],
          ["events", "الفعاليات"],
          ["partners", "الشركاء"],
          ["newsletter", "البريد"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key as Tab)}
            className={`rounded-xl px-4 py-2 ${tab === key ? "bg-blue-600 text-white" : "bg-white text-slate-700 border"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "members" && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm border">
            <h2 className="font-bold text-xl mb-4">إضافة عضو</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <input className="rounded-xl border px-4 py-3" placeholder="اسم العضو" value={memberName} onChange={(e) => setMemberName(e.target.value)} />
              <input className="rounded-xl border px-4 py-3" placeholder="الدور" value={memberRole} onChange={(e) => setMemberRole(e.target.value)} />
              <input className="rounded-xl border px-4 py-3" type="file" accept="image/*" onChange={(e) => setMemberImage(e.target.files?.[0] || null)} />
            </div>
            <button onClick={addMember} className="mt-4 rounded-xl bg-emerald-600 px-5 py-3 text-white">حفظ</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {members.map((item) => (
              <div key={item.id} className="rounded-2xl bg-white p-5 shadow-sm border">
                <img src={item.image_url || "/placeholder.svg"} alt={item.name} className="mb-4 h-28 w-28 rounded-full object-cover" />
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-slate-500">{item.role}</p>
                <button onClick={() => deleteRow("members", item.id)} className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-white">حذف</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "activities" && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm border">
            <h2 className="font-bold text-xl mb-4">إضافة نشاط</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <input className="rounded-xl border px-4 py-3" placeholder="عنوان النشاط" value={activityTitle} onChange={(e) => setActivityTitle(e.target.value)} />
              <input className="rounded-xl border px-4 py-3" placeholder="الوصف" value={activityDescription} onChange={(e) => setActivityDescription(e.target.value)} />
              <input className="rounded-xl border px-4 py-3" type="date" value={activityDate} onChange={(e) => setActivityDate(e.target.value)} />
              <select className="rounded-xl border px-4 py-3" value={activityCategory} onChange={(e) => setActivityCategory(e.target.value)}>
                <option value="education">تعليمي</option>
                <option value="psychological">نفسي</option>
                <option value="entertainment">ترفيهي</option>
              </select>
            </div>
            <button onClick={addActivity} className="mt-4 rounded-xl bg-emerald-600 px-5 py-3 text-white">حفظ</button>
          </div>

          <div className="grid gap-4">
            {activities.map((item) => (
              <div key={item.id} className="rounded-2xl bg-white p-5 shadow-sm border flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-slate-500">{item.description}</p>
                  <p className="text-sm text-blue-600 mt-1">{item.date} - {item.category}</p>
                </div>
                <button onClick={() => deleteRow("activities", item.id)} className="rounded-xl bg-red-600 px-4 py-2 text-white">حذف</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "events" && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm border">
            <h2 className="font-bold text-xl mb-4">إضافة فعالية</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <input className="rounded-xl border px-4 py-3" placeholder="عنوان الفعالية" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
              <input className="rounded-xl border px-4 py-3" placeholder="المكان" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
              <input className="rounded-xl border px-4 py-3" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
            </div>
            <button onClick={addEvent} className="mt-4 rounded-xl bg-emerald-600 px-5 py-3 text-white">حفظ</button>
          </div>

          <div className="grid gap-4">
            {events.map((item) => (
              <div key={item.id} className="rounded-2xl bg-white p-5 shadow-sm border flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-slate-500">{item.location}</p>
                  <p className="text-sm text-blue-600 mt-1">{item.date}</p>
                </div>
                <button onClick={() => deleteRow("events", item.id)} className="rounded-xl bg-red-600 px-4 py-2 text-white">حذف</button>
              </div>
            ))}
          </div>
        </div>
      )}

{tab === "partners" && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm border">
            <h2 className="font-bold text-xl mb-4">إضافة شريك</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <input className="rounded-xl border px-4 py-3" placeholder="اسم الشريك" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} />
              <input className="rounded-xl border px-4 py-3" placeholder="الموقع الإلكتروني" value={partnerWebsite} onChange={(e) => setPartnerWebsite(e.target.value)} />
              <input className="rounded-xl border px-4 py-3" type="file" accept="image/*" onChange={(e) => setPartnerLogo(e.target.files?.[0] || null)} />
            </div>
            <button onClick={addPartner} className="mt-4 rounded-xl bg-emerald-600 px-5 py-3 text-white">حفظ</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {partners.map((item) => (
              <div key={item.id} className="rounded-2xl bg-white p-5 shadow-sm border">
                <img src={item.logo_url || "/placeholder.svg"} alt={item.name} className="mb-4 h-24 w-full rounded-xl object-contain bg-slate-50 p-3" />
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-slate-500 break-all">{item.website}</p>
                <button onClick={() => deleteRow("partners", item.id)} className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-white">حذف</button>
              </div>
            ))}
          </div>
        </div>
      )}

       {tab === "newsletter" && (
        <div className="rounded-2xl bg-white p-5 shadow-sm border">
          <h2 className="font-bold text-xl mb-4">المشتركون بالبريد</h2>
          <div className="space-y-3">
            {subscribers.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-slate-500">{item.email}</p>
                </div>
                <button onClick={() => deleteRow("newsletter_subscribers", item.id)} className="rounded-xl bg-red-600 px-4 py-2 text-white">حذف</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}