Project snapshot
- Frontend: React (Vite) app in `frontend/` (entry: `src/main.jsx`, router + components in `src/component/`).
- Backend: Express + Mongoose server in `backend/server.js` (listens on port 5000). Uses MongoDB Atlas, JWT auth, multer for uploads and pdfkit for PDF generation.

Quick dev commands
- Start frontend dev server: from `frontend/` run `npm run dev` (uses Vite).
- Build frontend: `npm run build` in `frontend/`.
- Start backend: from repo root or `backend/` run `node server.js` (or `npm start` in `backend/`). Backend binds to http://localhost:5000 by default.

High-level architecture & data flow
- Single-repo monorepo with two parts: `frontend/` communicates with `backend/` over HTTP REST APIs.
- Frontend uses a runtime-config pattern: `window.__BACKEND_URL__` may be provided; otherwise components default to `http://localhost:5000`.
- Auth: backend issues JWTs at `/api/auth/login`; protected routes expect `Authorization: Bearer <token>` header. Local components sometimes store user email/role in localStorage (e.g. `employeeEmail`, `isAdmin`).
- File uploads: client sends multipart/form-data to endpoints like `/api/applications` and `/api/salary-slips` using FormData. Example: `fetch('http://localhost:5000/api/applications', { method: 'POST', body: fd })` (see `src/component/Apply.jsx`).
- Static/file serving: uploaded files are stored in `uploads/` and served at `/uploads/*` or via returned `pdfPath` fields which are constructed by the backend.

Conventions & patterns to follow
- API base: prefer using `const base = window.__BACKEND_URL__ || 'http://localhost:5000'` (already used across components).
- Error handling: UI code checks `res.ok` and reads `.json()` or `.text()`; follow this pattern rather than assuming 2xx responses.
- Real-time-ish updates: frontend dispatches and listens to CustomEvent `salarySlipCreated` to update lists without polling (see `SalarySlipGenerator.jsx` and `EmployeeDashboard.jsx`). Respect these local DOM events when adding new resources.
- Role checks: backend has role-based middleware (admin/manager/employee). Frontend encodes lightweight info in `localStorage` (`isAdmin`, `employeeEmail`) but should rely on backend for enforcement.

Key files to inspect when changing behavior
- `backend/server.js` — central place for models, routes, auth, file handling and PDF generation.
- `frontend/src/component/*.jsx` — UI surface; look at `Apply.jsx`, `SalarySlipGenerator.jsx`, `EmployeeDashboard.jsx`, and `Admin.jsx` for common API examples.
- `frontend/package.json` and `backend/package.json` — scripts and dependencies.

Integration notes & gotchas
- Mongo connection uses a hard-coded connection string in `server.js` (check `process.env` usage). Set `JWT_SECRET` and `DEFAULT_ADMIN_PWD` through environment when deploying.
- Uploaded paths: backend returns `pdfPath` which may contain backslashes on Windows; frontend normalizes with `.replace(/\\/g, '/')` before building URLs.
- CORS is enabled globally in `server.js`; when running frontend dev, it talks to `http://localhost:5000` directly.

When editing code, prioritize these short checks
1. If you change an API route, update all frontend callers under `frontend/src/component/` (search for `fetch("http://localhost:5000` or `${base}/api`).
2. If changing upload fields or FormData keys, update `Apply.jsx` and `SalarySlipGenerator.jsx` accordingly.
3. If touching auth, ensure tokens are issued at `/api/auth/login` and frontend sends `Authorization: Bearer <token>` where required.

If anything in this summary is unclear or you want more detail (examples, common refactors, or tests), tell me which area to expand.
