import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Admin.css';

const ManagerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo credentials
    if (email === 'manager@gmail.com' && password === 'manager123') {
      try { localStorage.setItem('isManager', 'true'); } catch(e) {}
  try { window.dispatchEvent(new Event('authChanged')); } catch(e) {}
  try { window.location.href = '/manager'; } catch(e) { navigate('/manager'); }
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <div className="admin-header"><h2>Manager Login</h2></div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <div style={{ color: '#d9534f', marginTop: 8 }}>{error}</div>}
          <div className="button-group">
            <button className="ok-btn" type="submit">Login</button>
            <button type="button" className="cancel-btn" onClick={() => { setEmail(''); setPassword(''); setError(''); }}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManagerLogin;
