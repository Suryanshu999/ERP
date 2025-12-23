## Abstract

This paper presents the design, implementation, and operational considerations of a lightweight ERP (Enterprise Resource Planning) system developed for small-to-medium businesses (SMBs). The system—implemented as a monorepo containing a React (Vite) frontend and an Express + Mongoose backend—supports role-based authentication, leave management, salary slip generation with PDF export, enquiries and quotation workflows, and job application handling with file uploads. We describe architecture choices, data models, API design, implementation trade-offs, and an evaluation methodology aimed at validating correctness, performance, and security. We conclude with limitations, proposed improvements, and a prioritized roadmap for production hardening.

**Keywords:** ERP, React, Express, MongoDB, pdfkit, multer, HR automation, small business software

---

## 1. Introduction

Enterprise software for small businesses ideally balances feature coverage with simplicity and maintainability. This project, "ABC IT Solutions — Lightweight ERP" (repo: `c:\Users\surya\Desktop\erp`), targets core HR and administrative workflows: leave requests, salary slip creation and distribution (PDF), customer enquiries and quotations, and job applications. The implementation prioritizes developer productivity (single-repo monorepo), clear REST APIs, and simple file-based PDF generation to minimize infrastructure assumptions during early-stage adoption.

### Motivation and objectives

- Provide a deployable baseline ERP covering common HR/admin flows.
- Offer clear code organization so engineers can extend features quickly.
- Favor simple, well-understood technologies (React, Express, MongoDB) for portability.

### Contributions

- A compact, working implementation of common ERP features.
- Design notes, data models, and an evaluation plan for validation and production hardening.
- Practical guidance for extending the system (storage, auth, CI/CD).

## 2. Related Work

There are many ERP and HR management solutions across the open-source and commercial ecosystems. Common references include:

- Full-featured ERP suites (Odoo, ERPNext) — comprehensive but heavy for small projects.
- Lightweight stacks using MERN (MongoDB, Express, React, Node) for rapid web app development.
- Libraries for file upload and PDF generation (multer, pdfkit) which this work builds upon.

This project positions itself as a lightweight, developer-friendly starting point compared to larger ERP suites.

## 3. System Architecture

### High-level components

- Frontend: React (Vite) single-page application in `frontend/`. Key UI components under `frontend/src/component/`.
- Backend: Express server with Mongoose models in `backend/server.js`. Handles REST APIs, file storage, PDF generation.
- Database: MongoDB Atlas (connection string present in `backend/server.js`).
- File storage: local `uploads/` directory; PDFs generated via pdfkit and stored under uploads.

### Mermaid architecture (renderable in Mermaid-enabled viewers)

```mermaid
flowchart LR
  Browser[Browser (React Vite)] -- REST/API --> Backend[Express + Mongoose]
  Backend -- MongoDB Atlas --> DB[(MongoDB)]
  Backend -- File storage --> Uploads[(uploads/)]
  Backend -- PDF generation (pdfkit) --> Uploads
  Browser -- File download --> Uploads
```

### Runtime detail

- Frontend discovers backend via `window.__BACKEND_URL__ || 'http://localhost:5000'`.
- Auth flow: backend issues JWTs; frontend uses localStorage for some lightweight role flags (`isAdmin`, `isManager`, `isEmployee`) for UI decisions. Backend role enforcement is recommended for production.

## 4. Data Models and APIs

This section summarizes primary Mongoose schemas and the main API endpoints. (For precise definitions, see `backend/server.js`.)

### 4.1 Models (summary)

- **Enquiry**
  - Fields: name, email, message, phone_number, status, timestamps
- **Quotation**
  - Fields: name, email, phone_number, company, service, budget, deadline, details, message, status, timestamps
- **Application (job applications)**
  - Fields: name, email, phone, position, resumePath, resumeOriginalName, coverLetterPath, coverLetterOriginalName, coverLetter, timestamps
- **SalarySlip**
  - Fields: employeeName, empId, email, designation, month, year, basic, hra, allowances, pf, tax, otherDeductions, totalEarnings, totalDeductions, netPay, pdfPath, createdBy, timestamps
- **Leave**
  - Fields: employeeName, employeeEmail, fromDate, toDate, days, type, reason, status (pending/approved/denied), monthlyQuota, leavesTakenThisMonth, timestamps

### 4.2 Selected API endpoints

- `POST /api/enquiries` — submit an enquiry (JSON)
- `POST /api/quotations` — submit a quotation (JSON)
- `POST /api/applications` — submit a job application (multipart/form-data, resume + optional cover letter)
- `GET/POST/PUT/DELETE /api/leaves` — create and manage leave requests
- `POST /api/salary-slips` — create salary slip (multipart/form-data possible if uploading PDF)
- `POST /api/salary-slips/:id/generate` — request server PDF generation for a slip
- `GET /api/salary-slips/:id/pdf` — fetch generated PDF

Note: See `backend/server.js` for exact request/response shapes.

### 4.3 Example API call (salary slip)

```bash
curl -X POST "http://localhost:5000/api/salary-slips" \
  -F "employeeName=John Doe" \
  -F "email=john@example.com" \
  -F "month=October" \
  -F "year=2025" \
  -F "basic=50000" \
  -F "hra=10000" \
  -F "allowances=5000" \
  -F "pf=2000" \
  -F "tax=3000" \
  -F "otherDeductions=0"
```

## 5. Implementation Details

### Code layout

- **Frontend:** `frontend/`
  - Entry: `src/main.jsx`
  - Components: `src/component/` (Admin.jsx, Navbar.jsx, SalarySlipGenerator.jsx, EmployeeDashboard.jsx, LeaveRequestPage.jsx, Quotation.jsx, Apply.jsx, etc.)
  - Styles: top-level CSS files (Admin.css, Navbar.css, etc.)
- **Backend:** `backend/server.js` (single-file server with models, routes, upload handling, PDF generation)
- **Uploads:** `uploads/` — local storage for resumés and PDFs

### Notable implementation points

- File uploads are handled via multer; routes expect specific field names (e.g., `resume`, `coverLetterFile`).
- PDF generation uses pdfkit; server can generate a PDF from slip data and return a `pdfPath`.
- The frontend sometimes forces full-page reloads after major state changes to ensure UI consistency (trade-off vs. SPA navigation).
- Real-time-ish updates: an in-window CustomEvent `salarySlipCreated` is dispatched by the frontend to refresh lists without polling.

## 6. Evaluation Plan

### Objective

Validate correctness (functionality), performance (latency under typical load), and security (basic hardening).

### 6.1 Functional tests (manual and automated)

**Manual checklist (smoke tests)**
1. Submit enquiry (POST /api/enquiries) → record appears in admin list.
2. Submit quotation (POST /api/quotations) → appears in quotation dashboard.
3. Submit job application (POST /api/applications) with resume and cover letter files → application appears; files stored in uploads/.
4. Create salary slip via UI → totals match computed values; server saves record; generate PDF, download works.
5. Create leave request → admin approves; status changes to approved.

**Automated tests (recommended)**
- Unit tests: model validation (Mongoose), utility helpers like salary math.
- Integration tests: spin Mongo test instance, exercise endpoints with Supertest or similar.

### 6.2 Performance

**Measure**
- API response times for key endpoints (GET /api/salary-slips, POST /api/applications).
- PDF generation latency for typical slip sizes.

**Approach**
- Use ApacheBench or k6 to simulate 50–200 requests for basic load profiling.
- Isolate PDF generation during a single test since it's I/O intensive.

### 6.3 Security checklist

- Verify JWT issuance and protected routes (admin-only endpoints) — currently partial; enforce server-side role checks.
- Upload validation: confirm allowed file types and size caps.
- Secrets: move Mongo connection string and JWT_SECRET to environment variables (currently embedded in `server.js` — the repo has a hard-coded string).

## 7. Discussion: Trade-offs and design decisions

- Simplicity vs production readiness: local file storage and full-page reloads simplify development but limit scalability and UX polish.
- Client-side salary computation vs server validation: frontend computes totals for immediate feedback; backend converts and persists numeric values but should also validate totals server-side to avoid tampering.
- Single-file server: `backend/server.js` centralizes logic for quick iteration, but as the project matures splitting into controllers/routes/models would improve maintainability.

## 8. Limitations

- Hard-coded Mongo connection string in `backend/server.js` — needs env-var migration.
- Uploads stored locally — not suitable for distributed deployments.
- Auth enforcement is partial; UI checks localStorage flags and dispatches events, but backend role middleware should be used consistently for security.
- No automated tests included.

## 9. Future Work & Roadmap

### Short-term (small)
- Move secrets to environment (`.env`) and remove hard-coded strings.
- Add server-side role middleware for protected endpoints.
- Replace full-page reloads with router-based navigation and React state/context.
- Add basic unit/integration tests and CI pipeline.

### Medium-term
- Migrate file storage to cloud (S3) and use signed URLs for secure access.
- Add logging/monitoring, rate-limiting, and input sanitization.
- Add migrations for historical data (e.g., move quotation-like enquiries into `quotations` collection if needed).

### Long-term
- Rework backend into modular routes/controllers, add GraphQL if needed for complex client queries, or introduce microservices for PDF generation or background jobs.

## 10. Reproducibility & How to Run

**Commands (dev)**
```powershell
# Start backend (from repo root: c:\Users\surya\Desktop\erp or backend/)
cd c:\Users\surya\Desktop\erp\backend
node server.js
# Or with env
$env:JWT_SECRET='your_jwt_secret'; node server.js

# Frontend
cd c:\Users\surya\Desktop\erp\frontend
npm install
npm run dev
```

**Note:** Frontend uses `window.__BACKEND_URL__ || 'http://localhost:5000'`. When deploying, set `window.__BACKEND_URL__` or configure a reverse proxy.

## 11. References

- React — Facebook (ReactJS) (https://reactjs.org)
- Express — Express.js (https://expressjs.com)
- MongoDB / Mongoose — MongoDB, Inc. (https://mongoosejs.com)
- multer — middleware for handling multipart/form-data (https://github.com/expressjs/multer)
- pdfkit — PDF generation for Node.js (https://pdfkit.org)

## 12. Appendix

### A. Key files and where to look

- Backend: `backend/server.js` — models, routes, upload handling, PDF generation.
- Frontend:
  - `frontend/src/component/SalarySlipGenerator.jsx` — salary creation UI and computeTotals logic.
  - `frontend/src/component/EmployeeDashboard.jsx` — employee landing page.
  - `frontend/src/component/LeaveRequestPage.jsx` — leave request UI.
  - `frontend/src/component/Quotation.jsx` and `QuotationDashboard.jsx` — quotation UI and admin dashboard.
  - `frontend/src/component/Apply.jsx` — job application form.
- Uploads directory: `uploads/`

### B. Suggested validation commands

- `curl 'http://localhost:5000/api/enquiries'`
- `curl -X POST 'http://localhost:5000/api/applications' -F 'name=Test' -F 'resume=@resume.pdf'`
