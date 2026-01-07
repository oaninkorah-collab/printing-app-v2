import { useEffect, useState } from "react";
import {
  addItem,
  getAllItems,
  deleteItem,
} from "../db/indexedDB";

export default function CustomerTypes() {
  console.log("CustomerTypes page loaded");
  const [types, setTypes] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  async function loadTypes() {
    setTypes(await getAllItems("customerTypes"));
  }

  useEffect(() => {
    loadTypes();
  }, []);

  async function saveType() {
    if (!name || !price) return alert("Fill all fields");

    await addItem("customerTypes", {
      name,
      pricePerSqFt: Number(price),
    });

    setName("");
    setPrice("");
    loadTypes();
  }

  async function removeType(id) {
    if (!confirm("Delete this customer type?")) return;
    await deleteItem("customerTypes", id);
    loadTypes();
  }

  return (
    <div>
      <h1>Customer Types</h1>

      <div style={styles.form}>
        <input
          placeholder="Type Name (e.g. Reseller)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Price per sq ft"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={saveType}>Save</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Price / sq ft</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {types.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.pricePerSqFt}</td>
              <td>
                <button onClick={() => removeType(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: 8,
    marginBottom: 16,
  },
  table: {
    width: "100%",
    background: "#fff",
  },
};
