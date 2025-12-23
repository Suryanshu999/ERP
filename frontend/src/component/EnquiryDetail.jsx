import React, { useEffect, useState } from "react";
import { formatDateISOToDDMMYYYY } from "../utils/dateFormat";

const EnquiryDetail = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => { fetchEnquiries(); }, []);

  const fetchEnquiries = async (query = "") => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/enquiries${query}`);
      const data = await res.json();
      setEnquiries(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markResolved = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/enquiries/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'Resolved' }) });
      fetchEnquiries();
    } catch (err) { console.error(err); }
  };

  const handleFilter = () => { if (fromDate && toDate) fetchEnquiries(`?from=${fromDate}&to=${toDate}`); };
  const handleToday = () => { const today = new Date().toISOString().split('T')[0]; fetchEnquiries(`?from=${today}&to=${today}`); };
  const handleClear = () => { setFromDate(''); setToDate(''); fetchEnquiries(); };

  if (loading) return <h2 style={{ textAlign: 'center' }}>Loading enquiries...</h2>;

  return (
    <div className="container">
      <div className="card fade-in" style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>📋 Enquiry Dashboard</h2>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          <button className="btn btn-primary" onClick={handleFilter}>Apply Filter</button>
          <button className="btn" onClick={handleToday} style={{ background: 'green', color: '#fff' }}>Show Today</button>
          <button className="btn" onClick={handleClear} style={{ background: 'gray', color: '#fff' }}>Clear</button>
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <div className="card" style={{ padding: 12, flex: 1 }}>
            <strong style={{ fontSize: 18 }}>{enquiries.length}</strong>
            <div className="muted">Total Enquiries</div>
          </div>
          <div className="card" style={{ padding: 12 }}>
            <strong style={{ fontSize: 18 }}>{enquiries.filter(e => e.status === 'Pending').length}</strong>
            <div className="muted">Pending</div>
          </div>
          <div className="card" style={{ padding: 12 }}>
            <strong style={{ fontSize: 18 }}>{enquiries.filter(e => e.status === 'Resolved').length}</strong>
            <div className="muted">Resolved</div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f1f1f1' }}>
              <tr>
                <th style={{ padding: 10, border: '1px solid #e6e6e6' }}>#</th>
                <th style={{ padding: 10, border: '1px solid #e6e6e6' }}>Name</th>
                <th style={{ padding: 10, border: '1px solid #e6e6e6' }}>Email</th>
                <th style={{ padding: 10, border: '1px solid #e6e6e6' }}>Phone</th>
                <th style={{ padding: 10, border: '1px solid #e6e6e6' }}>Message</th>
                <th style={{ padding: 10, border: '1px solid #e6e6e6' }}>Status</th>
                <th style={{ padding: 10, border: '1px solid #e6e6e6' }}>Date</th>
                <th style={{ padding: 10, border: '1px solid #e6e6e6' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry, idx) => (
                <tr key={enquiry._id || idx} style={{ background: '#fff' }}>
                  <td style={{ padding: 10, border: '1px solid #e6e6e6' }}>{idx + 1}</td>
                  <td style={{ padding: 10, border: '1px solid #e6e6e6' }}>{enquiry.name}</td>
                  <td style={{ padding: 10, border: '1px solid #e6e6e6' }}>{enquiry.email}</td>
                  <td style={{ padding: 10, border: '1px solid #e6e6e6' }}>{enquiry.phone_number}</td>
                  <td style={{ padding: 10, border: '1px solid #e6e6e6' }}>{enquiry.message}</td>
                  <td style={{ padding: 10, border: '1px solid #e6e6e6' }}><span style={{ color: enquiry.status === 'Resolved' ? 'green' : 'orange', fontWeight: 600 }}>{enquiry.status || 'Pending'}</span></td>
                  <td style={{ padding: 10, border: '1px solid #e6e6e6' }}>{formatDateISOToDDMMYYYY(enquiry.createdAt)}</td>
                  <td style={{ padding: 10, border: '1px solid #e6e6e6' }}>
                    {enquiry.status !== 'Resolved' && <button className="btn" onClick={() => markResolved(enquiry._id)} style={{ background: '#28a745', color: '#fff' }}>Mark Resolved</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnquiryDetail;
