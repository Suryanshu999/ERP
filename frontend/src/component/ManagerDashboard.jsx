import React from 'react';
import { Link } from 'react-router-dom';
import '../Admin.css';

const ManagerDashboard = () => {
  return (
    <div className="admin-container">
      <div className="admin-content">
        <div className="admin-header">
          <h2>Manager Dashboard</h2>
          <p className="muted">Quick access to manager tools.</p>
        </div>

        <div className="admin-grid" style={{ marginTop: 18 }}>
          <Link to="/manager/salary" className="card admin-card admin-card--enq">
            <div className="card-row">
              <div className="card-icon">💼</div>
              <div>
                <h3>Salary Slip</h3>
                <p className="muted">Generate salary slips for employees.</p>
              </div>
            </div>
          </Link>

          <Link to="/manager/projects" className="card admin-card admin-card--quote">
            <div className="card-row">
              <div className="card-icon">📁</div>
              <div>
                <h3>Projects</h3>
                <p className="muted">Manage projects (coming soon).</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
