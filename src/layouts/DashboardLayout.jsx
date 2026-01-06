import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./DashboardLayout.css";

export default function DashboardLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
