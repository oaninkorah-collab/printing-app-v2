import { useEffect, useState } from "react";
import { putItem, getAllItems } from "../db/indexedDB";

export default function BusinessSettings() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [logo, setLogo] = useState("");

  useEffect(() => {
    async function loadSettings() {
      const data = await getAllItems("settings");
      const business = data.find(d => d.key === "business");
      if (business) {
        setName(business.name || "");
        setPhone(business.phone || "");
        setLocation(business.location || "");
        setLogo(business.logo || "");
      }
    }
    loadSettings();
  }, []);

  function handleLogo(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  }

  async function saveSettings() {
    await putItem("settings", {
  key: "business",
  name,
  phone,
  location,
  logo,
});

    alert("Business info saved");
  }

  return (
    <div style={styles.box}>
      <h1>Business Settings</h1>

      <input
        placeholder="Business Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Location / Address"
        value={location}
        onChange={e => setLocation(e.target.value)}
        style={styles.input}
      />

      <input type="file" accept="image/*" onChange={handleLogo} />

      {logo && (
        <img
          src={logo}
          alt="Logo preview"
          style={{ height: 80, marginTop: 10 }}
        />
      )}

      <button onClick={saveSettings} style={styles.button}>
        Save
      </button>
    </div>
  );
}

const styles = {
  box: {
    background: "#fff",
    padding: 20,
    borderRadius: 8,
    maxWidth: 500,
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
