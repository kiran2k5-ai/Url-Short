// Date formatting
export const formatDate = (date) => {
  if (!date) return "N/A";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Format numbers with K, M, B suffixes
export const formatNumber = (num) => {
  if (!num) return "0";
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

// Get status metadata for display
export const getStatusMeta = (status) => {
  const statusMap = {
    active: { color: "text-green-600", bg: "bg-green-100", label: "Active" },
    inactive: { color: "text-gray-600", bg: "bg-gray-100", label: "Inactive" },
    expired: { color: "text-red-600", bg: "bg-red-100", label: "Expired" },
    paused: { color: "text-yellow-600", bg: "bg-yellow-100", label: "Paused" },
  };
  return statusMap[status] || statusMap.inactive;
};

// Truncate URLs for display
export const truncateUrl = (url, maxLength = 50) => {
  if (!url) return "";
  if (url.length <= maxLength) return url;
  return url.substring(0, maxLength) + "...";
};

// Ensure URL has protocol
export const ensureAbsoluteUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return "https://" + url;
};

// Format bytes to readable size
export const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
};

// Get time ago string
export const getTimeAgo = (date) => {
  if (!date) return "N/A";
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return Math.floor(seconds / 60) + "m ago";
  if (seconds < 86400) return Math.floor(seconds / 3600) + "h ago";
  if (seconds < 604800) return Math.floor(seconds / 86400) + "d ago";
  
  return then.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

// Validate URL format
export const isValidUrl = (url) => {
  try {
    new URL(ensureAbsoluteUrl(url));
    return true;
  } catch {
    return false;
  }
};
