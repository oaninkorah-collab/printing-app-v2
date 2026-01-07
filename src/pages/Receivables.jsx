import { useEffect, useState } from "react";
import { getAllItems } from "../db/indexedDB";

export default function Receivables() {
  const [receivables, setReceivables] = useState([]);

  useEffect(() => {
    async function loadReceivables() {
      const jobs = await getAllItems("jobs");
      const customers = await getAllItems("customers");

      // only jobs with balance
      const outstanding = jobs.filter(
        (j) => (j.balance ?? j.total) > 0
      );

      // group by customer
      const grouped = {};

      outstanding.forEach((job) => {
        if (!grouped[job.customerId]) {
          const customer = customers.find(
            (c) => c.id === job.customerId
          );

          grouped[job.customerId] = {
            customerName: job.customerName,
            phone: customer?.phone || "",
            totalOwed: 0,
            jobs: 0,
          };
        }

        grouped[job.customerId].totalOwed +=
          job.balance ?? job.total;
        grouped[job.customerId].jobs += 1;
      });

      setReceivables(Object.values(grouped));
    }

    loadReceivables();
  }, []);

  return (
    <div>
      <h1>Receivables</h1>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Outstanding Jobs</th>
            <th>Total Owed</th>
          </tr>
        </thead>

        <tbody>
          {receivables.length === 0 && (
            <tr>
              <td colSpan="4">No outstanding balances 🎉</td>
            </tr>
          )}

          {receivables.map((r, index) => (
            <tr key={index}>
              <td>{r.customerName}</td>
              <td>{r.phone}</td>
              <td>{r.jobs}</td>
              <td>
                <b>{r.totalOwed.toFixed(2)}</b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  table: {
    width: "100%",
    background: "#fff",
    borderCollapse: "collapse",
    borderRadius: 8,
  },
};
