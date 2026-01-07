import { useState } from "react";
import { addItem } from "../db/indexedDB";

export default function CustomerForm({ onSaved }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Customer name is required");
      return;
    }

    await addItem("customers", {
      name,
      phone,
      createdAt: new Date().toISOString(),
    });

    setName("");
    setPhone("");
    onSaved();
  }

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h3>Add Customer</h3>

      <input
        placeholder="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={styles.input}
      />

      <button style={styles.button}>Save Customer</button>
    </form>
  );
}

const styles = {
  form: {
    background: "#fff",
    padding: 16,
    borderRadius: 8,
    maxWidth: 400,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 10,
  },
  button: {
    padding: "8px 14px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};
