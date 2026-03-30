import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const loggedIn = localStorage.getItem("basira_admin_logged_in") === "true";
  return loggedIn ? <>{children}</> : <Navigate to="/admin" replace />;
}