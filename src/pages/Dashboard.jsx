import { useEffect, useState } from "react";
import { getAllItems } from "../db/indexedDB";

import DashboardCard from "../components/DashboardCard";

import {
  Wallet,
  Briefcase,
  Users,
  AlertCircle,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadStats() {
      const customers = await getAllItems("customers");
      const jobs = await getAllItems("jobs");
      const payments = await getAllItems("payments");

      const today = new Date().toDateString();

      const todaysPayments = payments.filter(
        (p) => new Date(p.date).toDateString() === today
      );

      const todaysSales = todaysPayments.reduce(
        (sum, p) => sum + p.amount,
        0
      );

      const todaysJobs = jobs.filter(
        (j) => new Date(j.createdAt).toDateString() === today
      );

      const outstanding = jobs.reduce(
        (sum, j) => sum + (j.balance ?? j.total),
        0
      );

      setStats({
        customers: customers.length,
        jobs: jobs.length,
        todaysJobs: todaysJobs.length,
        totalPayments: payments.reduce((s, p) => s + p.amount, 0),
        todaysSales,
        outstanding,
      });
    }

    loadStats();
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1>Dashboard</h1>

      <div style={styles.grid}>
       <div style={styles.grid}>
  <DashboardCard
    title="Today's Sales"
    value={stats.todaysSales.toFixed(2)}
    icon={Wallet}
    color="green"
    subtitle="Cash received today"
  />

  <DashboardCard
    title="Today's Jobs"
    value={stats.todaysJobs}
    icon={Briefcase}
    color="blue"
    subtitle="Jobs created today"
  />

  <DashboardCard
    title="Outstanding Balance"
    value={stats.outstanding.toFixed(2)}
    icon={AlertCircle}
    color="orange"
    subtitle="Amount owed"
  />

  <DashboardCard
    title="Total Customers"
    value={stats.customers}
    icon={Users}
    color="purple"
    subtitle="Registered customers"
  />
</div>

      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16,
  },
  card: {
    background: "#fff",
    padding: 16,
    borderRadius: 8,
  },
  title: {
    color: "#64748b",
    marginBottom: 6,
  },
};
