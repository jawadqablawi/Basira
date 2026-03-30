import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "admin@basira.com" && password === "12345678") {
      localStorage.setItem("basira_admin_logged_in", "true");
      navigate("/admin/dashboard");
      return;
    }

    setError("بيانات الدخول غير صحيحة");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">تسجيل دخول الأدمن</h1>
        <p className="text-slate-500 mb-6">ادخل إلى لوحة التحكم</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button className="w-full">دخول</Button>
        </form>
      </div>
    </div>
  );
}