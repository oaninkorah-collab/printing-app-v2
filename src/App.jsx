import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import PrintJobs from "./pages/PrintJobs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/jobs" element={<PrintJobs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

