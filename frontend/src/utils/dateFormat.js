// Simple date formatter: returns DD/MM/YYYY
export function formatDateISOToDDMMYYYY(isoOrDate) {
  if (!isoOrDate) return "";
  const d = typeof isoOrDate === "string" || typeof isoOrDate === "number" ? new Date(isoOrDate) : isoOrDate;
  if (isNaN(d.getTime())) return "";
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}
