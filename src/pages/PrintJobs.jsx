import { useEffect, useState } from "react";
import { getAllItems } from "../db/indexedDB";
import PrintJobForm from "../components/PrintJobForm";
import PaymentForm from "../components/PaymentForm";
import Receipt from "../components/Receipt";
import { printReceipt } from "../utils/printReceipt";

export default function PrintJobs() {
  const [jobs, setJobs] = useState([]);
  const [payments, setPayments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [printData, setPrintData] = useState(null);

  async function loadData() {
    setJobs(await getAllItems("jobs"));
    setPayments(await getAllItems("payments"));
    setCustomers(await getAllItems("customers"));
  }

  useEffect(() => {
    loadData();
  }, []);

  // trigger print after render
  useEffect(() => {
    if (printData) {
      setTimeout(() => {
        printReceipt();
        setPrintData(null);
      }, 100);
    }
  }, [printData]);

  return (
    <div>
      <h1>Print Jobs</h1>

      <PrintJobForm onSaved={loadData} />

      {jobs.map(job => {
        const jobPayments = payments.filter(p => p.jobId === job.id);
        const customer = customers.find(c => c.id === job.customerId);

        return (
          <div key={job.id} style={styles.card}>
            <b>{job.customerName}</b> — {job.jobType}<br />
            Total: {job.total.toFixed(2)}<br />
            Paid: {job.paid || 0}<br />
            Balance: {(job.balance ?? job.total).toFixed(2)}<br />
            Status: <b>{job.status}</b>

            {(job.balance ?? job.total) > 0 && (
              <PaymentForm job={job} onSaved={loadData} />
            )}

            <button
              style={styles.printBtn}
              onClick={() =>
                setPrintData({
                  job,
                  payments: jobPayments,
                  customer,
                })
              }
            >
              Print Receipt
            </button>
          </div>
        );
      })}

      {/* hidden receipt */}
      {printData && (
        <div style={{ position: "absolute", left: "-9999px" }}>
          <Receipt
            job={printData.job}
            payments={printData.payments}
            customer={printData.customer}
          />
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  printBtn: {
    marginTop: 8,
    padding: "6px 12px",
    background: "#0f172a",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};
