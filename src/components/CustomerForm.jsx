import { useEffect, useState } from "react";
import { addItem, getAllItems } from "../db/indexedDB";


export default function CustomerForm({ onSaved }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  
  const [types, setTypes] = useState([]);
  const [typeId, setTypeId] = useState("");

useEffect(() => {
  getAllItems("customerTypes").then(setTypes);
}, []);

useEffect(() => {
  async function loadTypes() {
    const data = await getAllItems("customerTypes");
    setTypes(data);
  }
  loadTypes();
}, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Customer name is required");
      return;
    }

await addItem("customers", {
  name,
  phone,
  customerTypeId: Number(typeId),
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

<select
  value={typeId}
  onChange={(e) => setTypeId(e.target.value)}
  style={styles.input}
>
  <option value="">Select Customer Type</option>
  {types.map((t) => (
    <option key={t.id} value={t.id}>
      {t.name}
    </option>
  ))}
</select>

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
