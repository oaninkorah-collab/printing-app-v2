import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  const [openReports, setOpenReports] = useState(false);
  const [openConfig, setOpenConfig] = useState(false);
  const [openFinance, setOpenFinance] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/reports")) {
      setOpenReports(true);
    }
    if (location.pathname.startsWith("/config")) {
      setOpenConfig(true);
    }
    if (location.pathname.startsWith("/finance")) {
      setOpenFinance(true);
    }
  }, [location.pathname]);

  const Arrow = ({ open }) => (
    <span className={`arrow ${open ? "open" : ""}`}>▶</span>
  );

  return (
    <aside className="sidebar">
      <h2 className="logo">PrintDesk</h2>

      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/customers">Customers</NavLink>
        <NavLink to="/jobs">Print Jobs</NavLink>
        <NavLink to="/payments">Payments</NavLink>
        <NavLink to="/receivables">Receivables</NavLink>
        <NavLink to="/expenses">Expenses</NavLink>

        {/* REPORTS */}
        <button
          className="dropdown-btn"
          onClick={() => setOpenReports(!openReports)}
        >
          <span>Reports</span>
          <Arrow open={openReports} />
        </button>

        {openReports && (
          <div className="dropdown">
            <NavLink to="/reports/revenue">Revenue</NavLink>
            <NavLink to="/reports/expenses">Expenses</NavLink>
            <NavLink to="/reports/profit-loss">Profit & Loss</NavLink>
          </div>
        )}

        {/* CONFIGURATION */}
        <button
          className="dropdown-btn"
          onClick={() => setOpenConfig(!openConfig)}
        >
          <span>Configuration</span>
          <Arrow open={openConfig} />
        </button>

        {openConfig && (
          <div className="dropdown">
            <NavLink to="/config/services">Services</NavLink>
            <NavLink to="/config/categories">Service Categories</NavLink>
            <NavLink to="/config/customers">Customer Types</NavLink>
            <NavLink to="/config/sizes">Preset Sizes</NavLink>
          </div>
        )}

        {/* FINANCIAL SETTINGS */}
        <button
          className="dropdown-btn"
          onClick={() => setOpenFinance(!openFinance)}
        >
          <span>Financial Settings</span>
          <Arrow open={openFinance} />
        </button>

        {openFinance && (
          <div className="dropdown">
            <NavLink to="/finance/payment-accounts">Payment Accounts</NavLink>
            <NavLink to="/finance/expense-accounts">Expense Accounts</NavLink>
          </div>
        )}
      </nav>
    </aside>
  );
}
