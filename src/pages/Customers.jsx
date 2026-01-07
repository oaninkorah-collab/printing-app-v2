import { useEffect, useState } from "react";
import { getAllItems, deleteItem } from "../db/indexedDB";
import CustomerForm from "../components/CustomerForm";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  async function loadCustomers() {
    const data = await getAllItems("customers");
    setCustomers(data);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this customer?")) return;
    await deleteItem("customers", id);
    loadCustomers();
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <div>
      <h1>Customers</h1>

      <CustomerForm onSaved={loadCustomers} />

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.length === 0 && (
            <tr>
              <td colSpan="3">No customers yet</td>
            </tr>
          )}

          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.phone}</td>
              <td>
                <button
                  onClick={() => handleDelete(c.id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
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
  deleteBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
};
