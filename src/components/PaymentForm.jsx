import { useState } from "react";
import { addItem, getAllItems, updateItem } from "../db/indexedDB";

export default function PaymentForm({ job, onSaved }) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Cash");

  async function handleSubmit(e) {
    e.preventDefault();

    const payAmount = Number(amount);
    if (payAmount <= 0) {
      alert("Enter valid amount");
      return;
    }

    // save payment
    await addItem("payments", {
      jobId: job.id,
      amount: payAmount,
      method,
      date: new Date().toISOString(),
    });

    // recalc payments
    const payments = await getAllItems("payments");
    const jobPayments = payments.filter(p => p.jobId === job.id);
    const totalPaid = jobPayments.reduce((s, p) => s + p.amount, 0);

    const balance = job.total - totalPaid;
    let status = "Unpaid";
    if (balance <= 0) status = "Paid";
    else if (totalPaid > 0) status = "Part Paid";

    await updateItem("jobs", {
      ...job,
      paid: totalPaid,
      balance,
      status,
    });

    setAmount("");
    onSaved();
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h4>Add Payment</h4>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={styles.input}
      />

      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        style={styles.input}
      >
        <option>Cash</option>
        <option>MoMo</option>
        <option>Bank</option>
        <option>POS</option>
      </select>

      <button style={styles.button}>Save Payment</button>
    </form>
  );
}

const styles = {
  form: {
    background: "#f8fafc",
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 8,
  },
  button: {
    padding: "6px 12px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};
