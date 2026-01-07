import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import PrintJobs from "./pages/PrintJobs";
import BusinessSettings from "./pages/BusinessSettings";
import Receivables from "./pages/Receivables";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/jobs" element={<PrintJobs />} />
          <Route path="/settings/business" element={<BusinessSettings />} />
          <Route path="/receivables" element={<Receivables />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

