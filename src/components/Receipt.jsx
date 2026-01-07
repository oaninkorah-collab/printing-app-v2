export default function Receipt({ job, payments, customer }) {
  const receiptNo = `REC-${String(job.id).padStart(6, "0")}`;
  const date = new Date().toLocaleString();

  const totalPaid = payments.reduce((s, p) => s + p.amount, 0);
  const lastPayment = payments[payments.length - 1];

  return (
    <div id="receipt" style={styles.receipt}>
      <h3 style={{ textAlign: "center" }}>PRINT RECEIPT</h3>

      <p><b>Receipt No:</b> {receiptNo}</p>
      <p><b>Date:</b> {date}</p>

      <hr />

      <p><b>Customer:</b> {customer?.name || job.customerName}</p>
      {customer?.phone && <p><b>Phone:</b> {customer.phone}</p>}

      <hr />

      <p><b>Job:</b> {job.jobType}</p>
      <p><b>Area:</b> {job.squareFeet.toFixed(2)} sq ft</p>
      <p><b>Quantity:</b> {job.quantity}</p>

      <hr />

      <p><b>Total:</b> {job.total.toFixed(2)}</p>
      <p><b>Paid:</b> {totalPaid.toFixed(2)}</p>
      <p><b>Balance:</b> {(job.total - totalPaid).toFixed(2)}</p>

      {lastPayment && (
        <>
          <hr />
          <p>
            <b>Last Payment:</b> {lastPayment.amount.toFixed(2)} (
            {lastPayment.method})
          </p>
        </>
      )}

      <p style={{ textAlign: "center", marginTop: 16 }}>
        Thank you for your business
      </p>
    </div>
  );
}

const styles = {
  receipt: {
    width: "80mm",
    background: "#fff",
    padding: 10,
    fontSize: 12,
    color: "#000",
    fontFamily: "Arial, sans-serif",
  },
};
