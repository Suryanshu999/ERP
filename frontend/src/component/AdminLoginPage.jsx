import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Admin.css';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === 'admin123') {
      try { localStorage.setItem('isAdmin', 'true'); } catch(e) {}
  try { window.dispatchEvent(new Event('authChanged')); } catch(e) {}
  try { window.location.href = '/admin'; } catch(e) { navigate('/admin'); }
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <div className="admin-header"><h2>Admin Login</h2></div>
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

export default AdminLoginPage;
