export const ensureAbsoluteUrl = (value = "") => {
    const trimmed = value.trim();

    if (!trimmed) {
        return "";
    }

    if (/^https?:\/\//i.test(trimmed)) {
        return trimmed;
    }

    return `https://${trimmed}`;
};

export const formatDate = (value, options = {}) => {
    if (!value) {
        return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        ...options
    }).format(date);
};

export const formatNumber = (value = 0) => new Intl.NumberFormat("en-US").format(value);

export const truncateUrl = (value = "", limit = 60) => {
    if (value.length <= limit) {
        return value;
    }

    return `${value.slice(0, limit).trim()}...`;
};

export const getStatusMeta = (url) => {
    const expired = Boolean(url?.expiryDate) && new Date(url.expiryDate).getTime() < Date.now();

    if (expired || url?.status === "EXPIRED") {
        return {
            label: "Expired",
            className: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300"
        };
    }

    return {
        label: "Active",
        className: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300"
    };
};

export const getInitials = (nameOrEmail = "") => {
    const source = nameOrEmail || "U";

    return source
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
};