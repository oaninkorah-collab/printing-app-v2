import { useEffect, useState } from "react";
import { addItem, getAllItems } from "../db/indexedDB";

export default function PrintJobForm({ onSaved }) {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [jobType, setJobType] = useState("");
  const [unit, setUnit] = useState("ft");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState("");

  useEffect(() => {
    async function loadCustomers() {
      const data = await getAllItems("customers");
      setCustomers(data);
    }
    loadCustomers();
  }, []);

  // convert to feet
  function toFeet(value) {
    const v = Number(value || 0);
    switch (unit) {
      case "in":
        return v / 12;
      case "cm":
        return v / 30.48;
      case "m":
        return v * 3.28084;
      default:
        return v;
    }
  }

  const widthFt = toFeet(width);
  const heightFt = toFeet(height);
  const squareFeet = widthFt * heightFt;
  const total = squareFeet * Number(unitPrice || 0) * Number(quantity || 1);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!customerId || !jobType || !unitPrice) {
      alert("Please fill required fields");
      return;
    }

    const customer = customers.find(c => c.id === Number(customerId));

    await addItem("jobs", {
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone || "",
      jobType,
      unit,
      width: Number(width),
      height: Number(height),
      squareFeet,
      quantity: Number(quantity),
      unitPrice: Number(unitPrice),
      total,
      paid: 0,
      balance: total,
      status: "Unpaid",
      createdAt: new Date().toISOString(),
    });

    setCustomerId("");
    setJobType("");
    setWidth("");
    setHeight("");
    setQuantity(1);
    setUnitPrice("");
    onSaved();
  }

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h3>New Print Job</h3>

      <select
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        style={styles.input}
      >
        <option value="">Select Customer</option>
        {customers.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <input
        placeholder="Job Type (Banner, Sticker, etc)"
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        style={styles.input}
      />

      <select
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        style={styles.input}
      >
        <option value="ft">Feet</option>
        <option value="in">Inches</option>
        <option value="cm">Centimeters</option>
        <option value="m">Meters</option>
      </select>

      <div style={styles.row}>
        <input
          placeholder={`Width (${unit})`}
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          style={styles.small}
        />
        <input
          placeholder={`Height (${unit})`}
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={styles.small}
        />
      </div>

      <input
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Unit Price (per sq ft)"
        type="number"
        value={unitPrice}
        onChange={(e) => setUnitPrice(e.target.value)}
        style={styles.input}
      />

      <strong>
        Area: {squareFeet.toFixed(2)} sq ft <br />
        Total: {total.toFixed(2)}
      </strong>

      <button style={styles.button}>Save Job</button>
    </form>
  );
}

const styles = {
  form: {
    background: "#fff",
    padding: 16,
    borderRadius: 8,
    maxWidth: 500,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 10,
  },
  row: {
    display: "flex",
    gap: 10,
    marginBottom: 10,
  },
  small: {
    flex: 1,
    padding: 8,
  },
  button: {
    marginTop: 10,
    padding: "8px 14px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};
