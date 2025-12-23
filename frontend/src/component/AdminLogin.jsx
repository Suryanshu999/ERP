import React, { useState } from "react";
import "../Admin.css";

const AdminLogin = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleLogin = () => {
    // Validate against hardcoded admin credentials
    if (email === "admin@gmail.com" && password === "admin123") {
      try { localStorage.setItem("isAdmin", "true"); } catch(e) {}
      onClose();
  try { window.dispatchEvent(new Event('authChanged')); } catch(e) {}
  try { window.location.href = "/enquiry"; } catch(e) { /* fallback */ }
    } else {
      setError("Invalid admin email or password");
    }
  };

  return (
    <div style={modalBackdrop}>
      <div className="admin-container" style={{ alignItems: 'center' }}>
        <div className="admin-content">
          <div className="admin-header">
            <h2>Admin Login</h2>
          </div>
          <div className="input-group">
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <div style={{ color: "#d9534f", marginTop: 8 }}>{error}</div>}
          <div className="button-group">
            <button className="ok-btn" onClick={handleLogin}>Login</button>
            <button className="cancel-btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const modalBackdrop = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2000,
};

export default AdminLogin;
