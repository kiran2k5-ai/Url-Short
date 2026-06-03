export const ensureAbsoluteUrl = (url) => {
  if (!url) return "";
  if (/^(https?:)?\/\//i.test(url)) {
    return url;
  }
  return `https://${url}`;
};

export const formatDate = (value) => {
  if (!value) return "No expiry";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Invalid date";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

export const formatNumber = (value) => {
  return typeof value === "number" ? value.toLocaleString() : value;
};

export const truncateUrl = (value, maxLength = 50) => {
  if (!value) return "";
  return value.length <= maxLength ? value : `${value.slice(0, maxLength - 3)}...`;
};

export const getStatusMeta = (url) => {
  const isExpired = url.expiryDate && new Date(url.expiryDate) <= new Date();
  return {
    text: isExpired ? "Expired" : "Active",
    badgeClass: isExpired ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
  };
};
