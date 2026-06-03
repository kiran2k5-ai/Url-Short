export const ensureAbsoluteUrl = (value = "") => {
  if (!value) return "";
  try {
    const trimmed = value.trim();
    const url = new URL(trimmed, window.location.origin);
    return url.href;
  } catch {
    return value;
  }
};

export const formatDate = (value, options = {}) => {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    ...options
  }).format(date);
};

export const formatNumber = (value) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return "0";
  return new Intl.NumberFormat("en-US").format(value);
};

export const truncateUrl = (url, length = 50) => {
  if (!url) return "";
  return url.length > length ? `${url.slice(0, length - 3)}...` : url;
};

export const getStatusMeta = (status) => {
  if (status === "EXPIRED") {
    return { label: "Expired", tone: "red" };
  }
  return { label: "Active", tone: "green" };
};
