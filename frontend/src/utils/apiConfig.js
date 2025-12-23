// Centralized API Configuration
// Supports both development and production environments

const getBackendURL = () => {
  // Check for environment variable first (set in .env)
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }

  // Check for window global variable (set in index.html or during build)
  if (window.__BACKEND_URL__) {
    return window.__BACKEND_URL__;
  }

  // Development fallback
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5000';
  }

  // Production: use current domain with /api prefix
  const protocol = window.location.protocol;
  const host = window.location.hostname;
  const port = window.location.port ? `:${window.location.port}` : '';
  return `${protocol}//${host}${port}`;
};

const BACKEND_URL = getBackendURL();

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${BACKEND_URL}/api/auth/login`,

  // Employees
  EMPLOYEES: `${BACKEND_URL}/api/employees`,
  GET_EMPLOYEE: (id) => `${BACKEND_URL}/api/employees/${id}`,
  UPDATE_EMPLOYEE: (id) => `${BACKEND_URL}/api/employees/${id}`,

  // Applications
  APPLICATIONS: `${BACKEND_URL}/api/applications`,
  DELETE_APPLICATION: (id) => `${BACKEND_URL}/api/applications/${id}`,

  // Enquiries
  ENQUIRIES: `${BACKEND_URL}/api/enquiries`,
  GET_ENQUIRY: (id) => `${BACKEND_URL}/api/enquiries/${id}`,
  UPDATE_ENQUIRY: (id) => `${BACKEND_URL}/api/enquiries/${id}`,

  // Quotations
  QUOTATIONS: `${BACKEND_URL}/api/quotations`,
  UPDATE_QUOTATION: (id) => `${BACKEND_URL}/api/quotations/${id}`,
  DELETE_QUOTATION: (id) => `${BACKEND_URL}/api/quotations/${id}`,

  // Leave Requests
  LEAVES: `${BACKEND_URL}/api/leaves`,
  APPROVE_LEAVE: (id) => `${BACKEND_URL}/api/leaves/${id}/approve`,
  DENY_LEAVE: (id) => `${BACKEND_URL}/api/leaves/${id}/deny`,
  AUTO_APPROVE_LEAVES: `${BACKEND_URL}/api/leaves/auto-approve`,
  BULK_ACTION_LEAVES: `${BACKEND_URL}/api/leaves/bulk-action`,

  // Salary Slips
  SALARY_SLIPS: `${BACKEND_URL}/api/salary-slips`,
  GENERATE_SALARY_PDF: (id) => `${BACKEND_URL}/api/salary-slips/${id}/generate`,
  GET_SALARY_PDF: (id) => `${BACKEND_URL}/api/salary-slips/${id}/pdf`,

  // Login Activities
  LOGIN_ACTIVITIES: `${BACKEND_URL}/api/login-activities`,
};

export { BACKEND_URL };
export default API_ENDPOINTS;
