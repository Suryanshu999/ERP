// ✅ Navbar.js — Navbar with Admin, Employee & Manager Login (Dropdown)
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ openAdminLogin }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem("isAdmin") === "true";
    } catch {
      return false;
    }
  });
  const [isManager, setIsManager] = useState(() => {
    try { return localStorage.getItem('isManager') === 'true'; } catch { return false; }
  });
  const [isEmployee, setIsEmployee] = useState(() => {
    try { return localStorage.getItem('isEmployee') === 'true'; } catch { return false; }
  });
  // Animations are permanently enabled globally; no local toggle required

  const navigate = useNavigate();
  const location = useLocation();

  // Sync admin status with localStorage updates
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "isAdmin") setIsAdmin(e.newValue === "true");
      if (e.key === "isManager") setIsManager(e.newValue === "true");
      if (e.key === "isEmployee") setIsEmployee(e.newValue === "true");
    };
    window.addEventListener("storage", onStorage);
    // Also listen for in-window auth changes (custom event dispatched by login/logout flows)
    const onAuthChanged = () => {
      try {
        setIsAdmin(localStorage.getItem('isAdmin') === 'true');
      } catch { setIsAdmin(false); }
      try {
        setIsManager(localStorage.getItem('isManager') === 'true');
      } catch { setIsManager(false); }
      try {
        setIsEmployee(localStorage.getItem('isEmployee') === 'true');
      } catch { setIsEmployee(false); }
    };
    window.addEventListener('authChanged', onAuthChanged);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener('authChanged', onAuthChanged);
    };
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    // notify other components in this window
    try { window.dispatchEvent(new Event('authChanged')); } catch (e) {}
    // full page reload to reset UI
    try { window.location.href = '/'; } catch (e) { navigate('/'); }
  };

  const handleManagerLogout = () => {
    localStorage.removeItem('isManager');
    setIsManager(false);
    try { window.dispatchEvent(new Event('authChanged')); } catch (e) {}
    try { window.location.href = '/'; } catch (e) { navigate('/'); }
  };

  const handleEmployeeLogout = () => {
    localStorage.removeItem('isEmployee');
    localStorage.removeItem('employeeEmail');
    setIsEmployee(false);
    try { window.dispatchEvent(new Event('authChanged')); } catch (e) {}
    try { window.location.href = '/'; } catch (e) { navigate('/'); }
  };

  return (
    <nav className="navbar fade-in card">
      {/* ✅ Left Side - Logo + Brand */}
      <div className="nav-left">
        <Link to="/" className="logo-link">
        
          <h1 className="brand">
            {isAdmin ? "ABC IT Solutions ERP" : "ABC IT Solutions"}
          </h1>
        </Link>
      </div>

      {/* ✅ Mobile Menu Toggle */}
      <button
        className="nav-toggle"
        onClick={() => setShowMenu((prev) => !prev)}
        aria-expanded={showMenu}
      >
        ☰
      </button>

      {/* ✅ Right Side Navigation */}
      <div className={`nav-right ${showMenu ? "open" : ""}`}>
        {/* Global animations are always enabled - no toggle required */}
  {!isAdmin && !isManager && !isEmployee ? (
          <>
            <Link to="/" className="nav-link" onClick={() => setShowMenu(false)}>Home</Link>
            <Link to="/services" className="nav-link" onClick={() => setShowMenu(false)}>Services</Link>
            <Link to="/quotation" className="nav-link" onClick={() => setShowMenu(false)}>Quotation</Link>
            <Link to="/enquiry" className="nav-link" onClick={() => setShowMenu(false)}>Enquiry</Link>
            <Link to="/apply" className="nav-link" onClick={() => setShowMenu(false)}>Apply</Link>

            <div className="nav-admin">
              <button className="nav-admin-btn" onClick={() => setShowDropdown((p) => !p)} aria-haspopup="true" aria-expanded={showDropdown}>
                <span className="nav-admin-icon">⚙️</span>
                <span className="nav-admin-label">Menu</span> ▾
              </button>
              {showDropdown && (
                <div className="nav-admin-menu card" role="menu">
                  <Link to="/employee-login" className="dropdown-item" onClick={() => setShowDropdown(false)}>Employee Login</Link>
                  <Link to="/admin-login" className="dropdown-item" onClick={() => setShowDropdown(false)}>Admin<br/>Login</Link>
                </div>
              )}
            </div>
          </>
        ) : isManager ? (
          <>
            <Link to="/manager" className="nav-link" onClick={() => setShowMenu(false)}>Manager Dashboard</Link>
            <button className="nav-admin-btn nav-admin-logout" onClick={handleManagerLogout}>Logout</button>
          </>
        ) : isEmployee ? (
          <>
            <button className="nav-admin-btn nav-admin-logout" onClick={handleEmployeeLogout}>Logout</button>
          </>
        ) : (
          <>
            { /* When admin is on the dashboard or any admin-related page, show only the Logout button. */ }
            {isAdmin && location ? (
              (() => {
                const p = location.pathname || '';
                const adminPrefixes = ['/admin', '/salary', '/enquiry', '/quot', '/application', '/leav', '/employee', '/admin'];
                const isAdminArea = adminPrefixes.some(prefix => p.startsWith(prefix));
                if (isAdminArea) {
                  return (<button className="nav-admin-btn nav-admin-logout" onClick={handleLogout}>Logout</button>);
                }
                return (
                  <>
                    <Link to="/admin" className="nav-link" onClick={() => setShowMenu(false)}>Dashboard</Link>
                    <Link to="/salary" className="nav-link" onClick={() => setShowMenu(false)}>Salary Slip</Link>
                    <Link to="/enquiry-details" className="nav-link" onClick={() => setShowMenu(false)}>Enquiries</Link>
                    <Link to="/quotations" className="nav-link" onClick={() => setShowMenu(false)}>Quotations</Link>
                    <Link to="/applications" className="nav-link" onClick={() => setShowMenu(false)}>Applications</Link>
                    <button className="nav-admin-btn nav-admin-logout" onClick={handleLogout}>Logout</button>
                  </>
                );
              })()
            ) : (
              <>
                <Link to="/admin" className="nav-link" onClick={() => setShowMenu(false)}>Dashboard</Link>
                <Link to="/salary" className="nav-link" onClick={() => setShowMenu(false)}>Salary Slip</Link>
                <Link to="/enquiry-details" className="nav-link" onClick={() => setShowMenu(false)}>Enquiries</Link>
                <Link to="/quotations" className="nav-link" onClick={() => setShowMenu(false)}>Quotations</Link>
                <Link to="/applications" className="nav-link" onClick={() => setShowMenu(false)}>Applications</Link>
                <button className="nav-admin-btn nav-admin-logout" onClick={handleLogout}>Logout</button>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
